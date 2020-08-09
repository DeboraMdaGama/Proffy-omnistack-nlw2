import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#8257E5',
        justifyContent:'center',
        padding:40,
    },
    
    banner:{
        width: '100%',
        marginTop: 20,
        resizeMode:'contain',
    },

    title:{
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 50,
    },   

    titleBold:{
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer:{
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 120,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 20,
        justifyContent: 'space-between',
    },

    buttonPrimary:{
        backgroundColor:'#8A2BE2',
    },

    buttonSecundary: {
        backgroundColor: '#8A2BE2',
        
    },

    buttonText:{
        fontFamily:'Archivo_700Bold',
        color:'#FFF',
        fontSize: 18,
        alignSelf:'center'
    },

    buttonImg:{
        alignSelf:'center',
    },

    totalConnections:{
        fontFamily: 'Poppins_400Regular',
        color:'#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        marginTop: 40,
        alignSelf:'center'
    },
});

export default styles;