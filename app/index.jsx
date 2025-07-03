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
      <Link href="/register">Masuk Ke Login</Link>
      <Link href="/news">Masuk Ke News</Link>
      <Link href="/feedbackForm">Masuk Ke Feedback Form</Link>
      <Link href="/faq">Masuk Ke FAQ</Link>
      <Link href="/editProfile">Masuk ke Edit Profile</Link>
      <Link href="/contactUs">Masuk ke Kontak Kami</Link>
      <Link href="/laporanForm">Masuk Ke Laporan Form</Link>
      <Link href="/maps">Masuk Ke Map</Link>
      <Link href="/settings">Masuk Ke Setting</Link>
      <Link href="/postPage">Masuk Ke Post Page</Link>
      <Link href="/newsPemerintah">Masuk Ke News Pemerintah</Link>
      <Link href="/postDetail">Masuk Ke Post Details</Link>
      <Link href="/postDetail_Admin">Masuk Ke Post Details Admin</Link>
      <Link href="/history">Masuk Ke Laporan</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})