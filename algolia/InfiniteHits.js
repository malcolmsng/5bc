import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import PostCard from '../components/PostCard';

const InfiniteHits = ({ hits, hasMore, refineNext }) => {
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
            <PostCard data={item}/>
      )}
    />
  );
} 


export default connectInfiniteHits(InfiniteHits)
