import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f0f7'
    },
    teacherList:{
        marginTop: -40,
    },
    searchForm:{
        marginBottom:24,
        marginTop: -15
    },
    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular',
    },
        
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
           
    inputBlock: {
        width:'48%'
    },

    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },

    submitButton:{
        backgroundColor:'#8A2BE2',
        height: 56,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText:{
        color:'#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 10
    },
})

export default styles;