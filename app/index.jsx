import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
// import "expo-router/entry"
import "../global.css"

const index = () => {
  return (
    <View>
      <Text>Home Awasin</Text>
      <Text>Home Awasin</Text>
      <Text>Home Awasin</Text>
      <Text>Home Awasin</Text>
      <Text>Home Awasin</Text>
      <Text className="text-3xl">Home Awasi</Text>
      <Link href="/register">Masuk Ke Register</Link>
      <Link href="/news">Masuk Ke News</Link>
      <Link href="/landing">Masuk Ke Landing</Link>
      <Link href="/login">Masuk Ke Login</Link>
      <Link href="/faq">Masuk Ke FAQ</Link>
      <Link href="/notification">Masuk Ke Notification</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})