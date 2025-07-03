import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavbar from './components/BottomNavbar';

const dummyPosts = [
  {
    id: 1,
    username: 'JojoSiwa',
    title: 'Jalan Rusak Pada Dipo',
    location: 'Bogor Selatan',
    description: 'Jalan berlubang cukup parah di daerah Dipo, rawan kecelakaan.',
    image: require('../assets/kdm.jpg'),
    status: 'Dalam Penanganan',
    trending: true,
    category: 'Roads',
  },
  {
    id: 2,
    username: 'AndiSaputra',
    title: 'Banjir di Jalan Baru',
    location: 'Bogor Barat',
    description: 'Air menggenangi jalan utama sejak pagi.',
    image: require('../assets/kdm.jpg'),
    status: 'Menunggu Tindakan',
    trending: false,
    category: 'Floods',
  },
  {
    id: 3,
    username: 'LiaPutri',
    title: 'Jalan Rusak Parah di Ciomas',
    location: 'Ciomas',
    description: 'Mohon perbaikan segera, sudah banyak korban terjatuh.',
    image: require('../assets/kdm.jpg'),
    status: 'Dilaporkan',
    trending: true,
    category: 'Roads',
  },
];

export default function HomePostList() {
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState('');
  const [categories] = useState(['All', 'Trending', 'Roads', 'Floods']);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = dummyPosts.filter((post) => {
    const matchCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Trending' && post.trending) ||
      post.category === activeCategory;

    const matchQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase());

    return matchCategory && matchQuery;
  });

  return (
    <View className="flex-1 bg-white w-full" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white w-full"
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Background Layer */}
        <View className="absolute top-0 left-0 right-0 h-40 bg-[#0C4A6E] rounded-b-3xl z-0" />

        {/* Header & Search */}
        <View style={{ paddingTop: insets.top + 10 }} className="z-10 w-full px-4">
          <Text className="text-3xl font-extrabold text-white mb-1">Awasin</Text>
          <Text className="text-sm text-[#d0d0d0] mb-4">AWAS KALI</Text>

          {/* Search Bar */}
          <View className="bg-white rounded-full flex-row items-center px-4 py-2 shadow w-full">
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search..."
              value={query}
              onChangeText={setQuery}
              className="flex-1 text-gray-700 ml-2"
              placeholderTextColor="#888"
            />
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
          >
            <View className="flex-row gap-2">
              {categories.map((cat, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full border-2 ${activeCategory === cat
                    ? 'bg-[#0C4A6E] border-[#0C4A6E]'
                    : 'border-[#0C4A6E]'
                    }`}
                >
                  <Text
                    className={`font-semibold ${activeCategory === cat ? 'text-white' : 'text-[#0C4A6E]'
                      }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Post List */}
        <View className="mt-6 px-4 w-full">
          {filteredPosts.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">
              Tidak ada postingan yang cocok.
            </Text>
          ) : (
            filteredPosts.map((post) => (
              <View
                key={post.id}
                className="mb-6 w-full"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <View className="relative">
                  <Image
                    source={post.image}
                    className="w-full h-48 rounded-t-2xl"
                    resizeMode="cover"
                  />
                  {post.trending && (
                    <Text className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded">
                      #1 Trending
                    </Text>
                  )}
                  <View className="absolute bottom-2 right-2 bg-[#102E4A] px-2 py-1 rounded">
                    <Text className="text-white text-xs font-semibold">
                      {post.status}
                    </Text>
                  </View>
                </View>

                <View className="px-4 py-3">
                  <Text className="text-sm text-gray-500 mb-1">{post.username}</Text>
                  <Text className="text-lg font-bold text-gray-900 mb-1">{post.title}</Text>

                  <View className="flex-row items-center mb-2">
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
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navbar (Fixed) */}
      <BottomNavbar />
    </View>
  );
}
