import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, Picker } from 'react-native'

export default function Home({ navigation }) {
    const [name, setName] = useState("")
    const [level, setLevel] = useState("easy")

    function validate() {
        if (name.trim().length === 0) {
            Alert.alert("Can't Play the Game", 'Please input your name!')
        } else {
            navigation.navigate('Board', {
                level, name
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ padding: 10, fontSize: 20 , textAlign : "center"}}>Please Input Your Name And Select Level To Playing This Game</Text>
            <TextInput
                style={{ height: 40, borderBottomWidth: 1.0 }}
                placeholder="Type Your Name!"
                onChangeText={name => setName(name)}
                defaultValue={name}
            />
            <Text style={{ padding: 10, fontSize: 30 }}>Select Level</Text>

            <Picker
                selectedValue={level}
                style={{ height: 50, width: 150 , marginBottom : 20}}
                onValueChange={(itemValue) => setLevel(itemValue)}
            >
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>


            <View style={styles.margin}>
                <Button
                    onPress={() => {
                        validate()
                    }
                    }
                    title="Play Game"
                    color="#841584"
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin: {
        marginBottom: 10
    },
});
