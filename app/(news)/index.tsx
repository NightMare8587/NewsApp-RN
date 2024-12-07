import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { uuid } from 'expo-modules-core';

export default function index() {
    const [data, setData] = useState<NewsApi | null>(null);
    interface NewsApi {
        status : string,
        totalResults: number,
        articles : Array<NewsObject> 
    }
    interface NewsObject {
        author : string,
        title : string,
        description: string,
        url : string,
        content : string
    }
    const fetchNews = async () => {
        const response = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=bce41573f1074a94b0c77a67ec57f0a0");
        if(!response.ok) {
            alert("API Call Failed")
            return
        }

        const jsonResponse = await response.json();

        setData(jsonResponse);
    }

    useEffect(() => {
        fetchNews()
    },[])

    const openWebLink = (url : string) => {
        Linking.openURL(url).catch((err) => {alert("Error opening link")})
    };
  return (
    <View>
      <FlatList
      data={data?.articles}
      renderItem={({item}) => 
        <TouchableOpacity onPress={() => openWebLink(item.url)} activeOpacity={1}>
            <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.content}</Text>
        </View>
        </TouchableOpacity>
      }>
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fcfbec',
        marginHorizontal: 10,
        marginVertical: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: 'black',
        padding: 10
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 400,
        color: 'grey',
        padding: 5
    }
})