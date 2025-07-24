import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import UploadImage from "./components/UploadImage";
import { useRouter } from 'expo-router';
import AlertCustom from './components/alertCustom';

export default function FormPostNews() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageUri, setImageUri] = useState(null);

    // Tambahkan state errors
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const categories = ['Politik', 'Sosial', 'Ekonomi', 'Lingkungan'];

    const router = useRouter();
    const insets = useSafeAreaInsets();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        let newErrors = {};

        if (!title) newErrors.title = true;
        if (!selectedCategory) newErrors.category = true;
        if (!description) newErrors.description = true;
        if (!imageUri) newErrors.image = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const postData = {
            title,
            description,
            category: selectedCategory,
            image: imageUri,
        };

        setShowAlert(true);
    };

    return (
        <SafeAreaView className="flex-1 bg-white relative">
            {/* Arrow Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    position: 'absolute',
                    top: insets.top + 8,
                    left: 16,
                    zIndex: 50,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 8,
                    borderRadius: 999,
                }}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <AlertCustom
                visible={showAlert}
                onClose={() => setShowAlert(false)}
                title="Siap Tuan Muda!"
                message="Berita berhasil diterbitkan dan sudah bisa dibaca oleh pengguna lain. Terimakasih!"
                buttonText="Mengerti"
                redirectTo="/news"
            />

            {/* Form Content */}
            <ScrollView
                className="flex-1 bg-white px-4 py-6"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text className="text-2xl font-extrabold mt-12 mb-6">Buat Berita</Text>

                {/* Input Title */}
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    className="border rounded-md px-4 py-3 mb-1 text-base"
                    style={[
                        { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 4 },
                        errors.title ? { borderColor: 'red' } : { borderColor: '#d1d5db' },
                    ]}
                />

                {/* Dropdown Kategori */}
                <TouchableOpacity
                    onPress={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
                    className="border rounded-md px-4 py-3 mb-1 flex-row justify-between items-center"
                    style={[
                        {
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 4,
                        },
                        errors.title ? { borderColor: 'red' } : { borderColor: '#d1d5db' }
                    ]}
                >
                    <Text className="text-base text-gray-700">
                        {selectedCategory || 'Enter Tags'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="gray" />
                </TouchableOpacity>

                {categoryDropdownVisible && (
                    <View className="border border-black rounded-md mb-4 bg-white shadow z-50">
                        {categories.map((cat, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedCategory(cat);
                                    setCategoryDropdownVisible(false);
                                }}
                                className="px-4 py-3 border-b border-gray-200"
                            >
                                <Text className="text-base text-black">{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Deskripsi */}
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter Description"
                    multiline
                    numberOfLines={4}
                    className="border rounded-md px-4 py-3 mb-1 text-base text-gray-700"
                    style={[
                        {
                            textAlignVertical: 'top',
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 4,
                        },
                        errors.description ? { borderColor: 'red' } : { borderColor: '#d1d5db' }
                    ]}
                />

                {/* Upload Gambar */}
                <UploadImage imageUri={imageUri} />

                {Object.keys(errors).length > 0 && (
                    <Text
                        style={{
                            color: '#B91C1C',
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            textAlign: 'center',
                            fontSize: 13,
                            marginBottom: 12,
                        }}
                    >
                        Harap lengkapi semua kolom
                    </Text>
                )}


                {/* Tombol Submit */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[#102E4A] px-4 py-4 rounded-md w-full items-center mt-2"
                >
                    <Text className="text-white font-medium tracking-widest">SUBMIT FORM</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
