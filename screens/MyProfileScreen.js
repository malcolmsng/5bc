import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';
import PostCard from '../components/PostCard'

export default function MyProfileScreen({ navigation }) {

    const { currentUser, currentUserData } = useAuth() 
    const [posts, setPosts] = useState([])
    const [faves, setFaves] = useState([])

    useEffect(() => {
        const fetch =  async () => {
            let renderList = []
            for (const post of currentUserData.posts) {
                const postData =  await db.collection("posts").doc(post).get().then(res => res.data())
                if (postData) {
                    renderList.push({...postData, id: post})
                } else {
                    await db.collection("users").doc(currentUser.uid).update({
                        posts: firebase.firestore.FieldValue.arrayRemove(post)
                    })
                }
            }
            setPosts(renderList)
        }
        fetch()
    }, [currentUserData.posts])

    useEffect(() => {
        const fetch =  async () => {
            let renderList = []
            for (const post of currentUserData.favourites) {
                const postData =  await db.collection("posts").doc(post).get().then(res => res.data())
                if (postData) {
                    renderList.push({...postData, id: post})
                } else {
                    await db.collection("users").doc(currentUser.uid).update({
                        favourites: firebase.firestore.FieldValue.arrayRemove(post)
                    })
                }
            }
            setFaves(renderList)
        }
        fetch()
    }, [currentUserData.favourites])

    return (
      
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleBar}>
                  {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                  <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
              </View>

              <View style={{ alignSelf: "center" }}>
                  <View style={styles.profileImage}>
                      <Image source={{ uri:"https://pyxis.nymag.com/v1/imgs/70d/22d/29a71747bc5c56d04374d32c197ff8a4f2-kikis-delivery-service.rsquare.w1200.jpg"}} style={styles.image} resizeMode="center"></Image>
                  </View>
                  {/* <View style={styles.dm}>
                      <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                  </View>
                  <View style={styles.active}></View> */}
                  {/* <View style={styles.add}>
                      <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                  </View> */}
              </View>

              <View style={styles.infoContainer}>
                  <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>KiKi</Text>
                  {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text> */}
              </View>

              <View style={styles.statsContainer}>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>{posts.length}</Text>
                      <Text style={[styles.text, styles.subText]}>Posts</Text>
                  </View>
                  <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                      <Text style={[styles.text, { fontSize: 24 }]}>{faves.length}</Text>
                      <Text style={[styles.text, styles.subText]}>Favourite</Text>
                  </View>
                  {/* <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                      <Text style={[styles.text, styles.subText]}>Following</Text>
                  </View> */}
              </View>

              <View style={{ marginTop: 32 }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      {posts.map((data, index) => {
                          return (
                            <View style={styles.mediaImageContainer}>
                                <PostCard data={data} onPress={() => navigation.navigate('View Post', {postId: data.id})}/>
                           </View>
                          )
                      })}
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{posts.length}</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Posts</Text>
                    </View>
                  </ScrollView>
                  
                  <ScrollView>
                    <View style={{ marginTop: 32 }}>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {faves.map((data, index) => {
                                return (
                                    <View style={styles.mediaImageContainer}>
                                        <PostCard data={data} onPress={() => navigation.navigate('View Post', {postId: data.id})}/>
                                    </View>
                                )
                            })}
                          <View style={styles.mediaCount}>
                              <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{faves.length}</Text>
                              <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Favourites</Text>
                          </View>
                  </ScrollView>
              
              {/* <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
              <View style={{ alignItems: "center" }}>
                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                          </Text>
                      </View>
                  </View>

                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                          </Text>
                      </View>
                  </View>
              </View> */}
              </View>
          </ScrollView>
          </View>
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      //fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 50,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 10,
      overflow: "hidden",
      marginHorizontal: 6
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});

