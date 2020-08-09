import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import search from '../../assets/images/icons/search.svg';
import api from '../../services/api';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes',{
            params:{
                week_day,
                subject,
                time
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis">
               <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select name="subject" label="Matéria" 
                    value={subject} 
                    onChange={(e) => {setSubject(e.target.value)}}
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Bilogia'},
                        {value: 'Química', label: 'Química'},
                        {value: 'Física', label: 'Física'},
                        {value: 'Matemática', label: 'Matemática'},
                        {value: 'Inglês', label: 'Inglês'},
                        {value: 'Português', label: 'Português'},
                        {value: 'Educação física', label: 'Educação física'},
                        {value: 'Geografia', label: 'Geografia'},
                        {value: 'História', label: 'História'},
                    ]}/>
                    <Select name="week-day" label="Dia da Semana" 
                    value={week_day} onChange={(e) => {setWeekDay(e.target.value)}}
                    options={[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'},
                    ]}/>
                    <Input type="time" name="time" label="Horário" value={time} onChange={(e) => {setTime(e.target.value)}}/>
                    <button type="submit">
                         <img src={search} alt="Pesquisar"/> Pesquisar
                    </button>
               </form>
           </PageHeader>
           <main>
             {teachers.map((teacher: Teacher) =>{
                 return <TeacherItem key={teacher.id} teacher={teacher}/>;
             })}
            </main>
        </div>
    )
}

export default TeacherList;