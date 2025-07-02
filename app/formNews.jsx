import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UploadImage from "./components/UploadImage";

const AddNewsForm = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [form, setForm] = useState({
        title: "",
        category: "Lainnya",
        tags: "",
        description: "",
        location: "",
        images: [],
    });

    const handleSubmit = () => {
        console.log(form);
        alert('Berita berhasil dibuat!');
        router.push('/news');
    };

    return (
        <ScrollView
            className="flex-1 bg-white px-6"
            contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 20 }}
        >
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold mb-6">Buat Laporan</Text>

            <TextInput
                placeholder="Masukkan judul"
                value={form.title}
                onChangeText={(text) => setForm({ ...form, title: text })}
                className="border border-gray-300 rounded-lg p-3 mb-4"
            />

            <TextInput
                placeholder="Kategori (misal: Jalan, Gedung)"
                value={form.category}
                onChangeText={(text) => setForm({ ...form, category: text })}
                className="border border-gray-300 rounded-lg p-3 mb-4"
            />

            <TextInput
                placeholder="Masukkan tags"
                value={form.tags}
                onChangeText={(text) => setForm({ ...form, tags: text })}
                className="border border-gray-300 rounded-lg p-3 mb-4"
            />

            <TextInput
                placeholder="Masukkan deskripsi"
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
                multiline
                numberOfLines={4}
                className="border border-gray-300 rounded-lg p-3 mb-4 h-32 text-top"
            />

            <UploadImage
                images={form.images}
                setForm={setForm}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#0C4A6E] py-4 rounded-xl"
            >
                <Text className="text-center text-white font-bold">SUBMIT FORM</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddNewsForm;
