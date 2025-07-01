import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../components/AuthLayout'

const FaceScan = () => {
  const navigation = useNavigation()

  return (
    <Layout>
      {/* Header dengan back button */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 mr-2"
        >
          <Ionicons name="arrow-back" size={24} className="text-gray-800" />
        </TouchableOpacity>
      </View>
      
      {/* Konten utama */}
      <View className="flex-1 justify-start items-center p-6 pt-0 gap-4 ">
        <View className="flex items-center justify-start ">

            <Text className="text-[25px] font-poppins-bold">Scan Wajah</Text>
            <Text className="text-sm font-poppins text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, itaque nisi. Eius dolore expedita consequatur!
            </Text>
        </View>
        
        {/* Area pemindaian wajah */}
        <View className="w-full h-[50%] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 justify-center items-center">
          <Ionicons name="camera" size={48} className="text-gray-400" />
          <Text className="mt-2 text-gray-500 text-center px-4">Posisikan wajah Anda dalam frame</Text>
        </View>
        
        {/* Tombol action */}
        <View className="mt-6 flex gap-4 w-full items-center">
            <TouchableOpacity className=" w-[80%] bg-[#102E4A] px-8 py-3 rounded-xl flex items-center">
            <Text className="text-white  font-medium font-poppins ">Scan Wajah</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[80%] bg-[#102E4A] px-8 py-3 rounded-xl flex items-center">
            <Text className="text-white  font-medium font-poppins ">Next</Text>
            </TouchableOpacity>
        </View>
        
        
      </View>
    </Layout>
  )
}

export default FaceScan