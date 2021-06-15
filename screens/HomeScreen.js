import React from 'react'
import { Text, View, ScrollView,} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import PostCard from '../components/PostCard';


export default function HomeScreen() {
    return (

      <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>
        <ScrollView style={{backgroundColor: "rgb(240, 240, 240)", width: "100%", flex: 1}}>
        <Grid style={{width: "100%",  flex: 1, justifyContent: "center", alignItems: "center",}}>
          <Row>
            <Col>
              <PostCard />
            </Col>
          </Row>

          <Row>
            <Col>
              <PostCard />
            </Col>
          </Row>

          <Row>
            <Col>
              <PostCard />
            </Col>
          </Row>
          
          <Row>
            <Col>
              <PostCard />
            </Col>
          </Row>

        </Grid>
        </ScrollView>
      </View>

    )
}

