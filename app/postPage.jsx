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
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from './components/BottomNavbar';

const statuses = ['Menunggu','Ditinjau','Ditolak','Diproses','Selesai'];
const statusColors = {
  Menunggu: '#EAC1EA', 
  Ditinjau: '#AED0FF', 
  Ditolak: '#FAD8DD',  
  Diproses: '#FFF085', 
  Selesai: '#CDF0D7',  
};

const fontColors = {
  Menunggu: '#553681', 
  Ditinjau: '#33659B', 
  Ditolak: '#C77680',  
  Diproses: '#7D6630', 
  Selesai: '#55B57A',  
};


const dummyPosts = [
  {
    id: 1,
    username: 'JojoSiwa',
    title: 'Jalan Rusak Pada Dipo',
    location: 'Bogor Selatan',
    description: 'Jalan berlubang cukup parah di daerah Dipo, rawan kecelakaan.',
    image: require('../assets/kdm.jpg'),
    status: statuses[0],
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
    status: statuses[4],
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
    status: statuses[3],
    trending: true,
    category: 'Roads',
  },
];
function getTransparentColor(hex, alpha) {
  // Ubah hex ke rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


export default function HomePostList() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
    <View className="flex-1 bg-white w-full" style={{ paddingTop: insets.top, paddingBottom: 8 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white w-full"
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Background Layer */}
        <View className="absolute top-0 left-0 right-0 h-40 bg-[#102E4A] font-poppins-extrabold rounded-b-3xl z-0" />

        {/* Header & Search */}
        <View style={{ paddingTop: insets.top }} className="z-10 w-full px-4">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-3xl font-poppins-extrabold text-white">Awasin</Text>
              <Text className="text-sm font-poppins text-[#d0d0d0]">AWAS KALI</Text>
            </View>
            <Image
              source={require('../assets/logo-white.png')}
              style={{ width: 60, height: 60 }}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>

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
                    ? 'bg-[#102E4A] border-[#102E4A]'
                    : 'border-[#102E4A]'
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
              <TouchableOpacity
                key={post.id}
                onPress={() => navigation.navigate('postDetail')}
                className="bg-white rounded-2xl shadow mb-6 overflow-hidden w-full"
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
                  <View
                      className="absolute top-2 right-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: getTransparentColor(statusColors[post.status] || '#102E4A', 1),
                      }}
                    >
                    <Text className="text-white text-sm font-poppins-semibold opacity-100" style={{color: fontColors[post.status] || '#FFFFFF'  }}>
                      {post.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navbar (Fixed) */}
      <BottomNavbar />
    </View>
  );
}
