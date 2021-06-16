import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import PostCard from '../components/PostCard';
import { useNavigation } from '@react-navigation/native';

const InfiniteHits = ({ hits, hasMore, refineNext }) => {

  const navigation = useNavigation();
  
  if (hits.length === 0) {
    return (
      <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <Text>
          No results found
        </Text>
      </View>
    )
  } 
  return (
    <FlatList 
      style={{height: "100%", width: "95%"}}
      data={hits}
      keyExtractor={item => item.objectID}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{
      //   width: "100%",
      // }}
      // ItemSeparatorComponent={() => <View style={{height: 10}} />} 
      // style={styles.separator}
      onEndReached={() => hasMore && refineNext()}
      renderItem={({ item }) => (
            <PostCard data={item} onPress={() => navigation.navigate('View Post', {postId: item.objectID})}/>
      )}
    />
  );
} 


export default connectInfiniteHits(InfiniteHits)
