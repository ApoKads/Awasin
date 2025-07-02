import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const dummyPosts = [
  {
    id: 1,
    username: 'JojoSiwa',
    title: 'Jalan Rusak Pada Dipo',
    location: 'Location',
    description: 'Rusak nih jalanan haduh',
    image: require('../assets/kdm.jpg'), // Ganti sesuai path gambar
    status: 'Status',
    trending: true
  },
  {
    id: 2,
    username: 'JojoSiwa',
    title: 'Jalan Rusak Pada Dipo',
    location: 'Location',
    description: 'Rusak nih jalanan haduh',
    image: require('../assets/kdm.jpg'),
    status: 'Status',
    trending: true
  }
  // Tambahkan data lainnya di sini
];

export default function HomePostList() {
  return (
    <ScrollView className="bg-white px-4 pt-4">
      {dummyPosts.map((post) => (
        <View key={post.id} className="bg-white rounded-2xl shadow mb-6 overflow-hidden">
          <View className="relative">
            <Image source={post.image} className="w-full h-48" resizeMode="cover" />
            {post.trending && (
              <Text className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded">
                #1 Trending
              </Text>
            )}
            <View className="absolute bottom-2 right-2 bg-[#102E4A] px-2 py-1 rounded">
              <Text className="text-white text-xs font-semibold">{post.status}</Text>
            </View>
          </View>

          <View className="px-4 py-3">
            <Text className="text-sm text-gray-500 mb-1">{post.username}</Text>
            <Text className="text-lg font-bold text-gray-900">{post.title}</Text>
            <View className="flex-row items-center mb-1">
              <View className="w-6 h-6 rounded-full bg-[#102E4A] items-center justify-center mr-2">
                <Image
                  source={require('../assets/icons/vectorart-location.png')}
                  className="w-3.5 h-3.5"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-sm text-gray-700">{post.location}</Text>
            </View>

            <Text className="text-sm text-gray-700">{post.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
