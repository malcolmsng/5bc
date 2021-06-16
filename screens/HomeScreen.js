import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, FlatList, SafeAreaView} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import PostCard from '../components/PostCard';
import { db } from '../firebase';
import algoliasearch from 'algoliasearch';

import SearchBox from '../algolia/SearchBox';


import {
  InstantSearch,
  Configure
} from 'react-instantsearch-native';

import InfiniteHits from '../algolia/InfiniteHits';

const searchClient = algoliasearch(
  '9PW6UHLJG6',
  '79987c1d86acd8938119de64df89c4b2'
);

const HomeScreen = ({ navigation }) => {

  

  // const [posts, setPosts] = useState([])
  
  useEffect(() => {
    // db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapShot => {
    //   setPosts(snapShot.docs.map(doc => ({
    //     id: doc.id, ...doc.data()
    //   })))
    // })
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{width: "100%", justifyContent: "center", alignItems: "center", }}>  
        <InstantSearch
            searchClient={searchClient}
            indexName="posts"
          >
            {/* <Configure
                hitsPerPage={1}
            /> */}
            <SearchBox  />
            <InfiniteHits />
          </InstantSearch>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen