import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to:string;
}

export default class ClassesController {
    async index(request:Request, response:Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        
        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters! Search failed! Select the filters to search classes!'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);//Diz que o filters.time é string
        
        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')//pega o itens da class-schedule de acordo com o id da classe
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])// coloca as interrogações pq o próximo elemento é uma constante 
            .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
            .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request:Request, response:Response) { // precisa desse 2 parametro para pegar a rota e responder pro user
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
        
        const trx = await db.transaction();
        
        try{   
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            
            const user_id = insertedUsersIds[0];
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
    
            const class_id = insertedClassesIds[0];
    
            const classSchedule = schedule.map((scheduleItem:ScheduleItem )=>{
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
            
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
            
            return response.status(201).send();
            //status(201) significa -> criado com sucesso.
        } catch (err){
    
            await trx.rollback();//para desfazer as alterações no DB quando dar error
            return response.status(400).json({
                error: "Unexpected error while creating a new class"
            })
        }
    
    }
}