import React, { useState,} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFilteresVisible, setIsFiltersVisible] = useState(true);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) =>{
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }
    useFocusEffect(() =>{
        loadFavorites();
    });
    async function handleFiltersSubmit(){
      
        loadFavorites();
        const response = await api.get('classes',{
            params:{
                week_day,
                subject,
                time
            }
        });
        setIsFiltersVisible(false);
        setTeachers(response.data);
    }
    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFilteresVisible);
    }
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" 
                headerRigth={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={24} color="#fff"/>
                    </BorderlessButton>
                )}
            
            >
                {isFilteresVisible && (
                    <View style={styles.searchForm} >
                        <Text style={styles.label} > Matéria</Text>
                        <TextInput 
                            
                            style={styles.input} 
                            placeholder="Qual é a matéria?"
                            placeholderTextColor='#c1bccc'
                            value={subject} 
                            onChangeText={ text => setSubject(text)}
                        />

                        <View style={styles.inputGroup} >
                            <View style={styles.inputBlock} >
                                <Text style={styles.label} > Dia da Semana</Text>
                                <TextInput 
                                   
                                    style={styles.input} 
                                    placeholder="Qual é o dia?" 
                                    placeholderTextColor='#c1bccc' 
                                    value={week_day} 
                                    onChangeText={ text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock} >
                                <Text style={styles.label} > Horário</Text>
                                <TextInput 
                                    placeholderTextColor="#c1bccc" 
                                    style={styles.input} 
                                    placeholder="Qual o horário?"
                                    value={time} 
                                    onChangeText={ text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Feather name="filter" size={20} color="#fff"/>
                            <Text style={styles.submitButtonText}>
                                  Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map( (teacher: Teacher) => {
                    return (
                        <TeacherItem  
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}

            </ScrollView>
        </View>
    );
}

export default TeacherList;