import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import UploadImage from "./components/UploadImage";
import { useRouter } from "expo-router";
import AlertCustom from "./components/alertCustom";

export default function FormPostNews() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    images: [], // array sesuai UploadImage
  });

  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const categories = ["Politik", "Sosial", "Ekonomi", "Lingkungan"];

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    let newErrors = {};

    if (!form.title) newErrors.title = true;
    if (!form.category) newErrors.category = true;
    if (!form.description) newErrors.description = true;
    if (!form.images || form.images.length === 0) newErrors.images = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const postData = { ...form };

    // Submit logic di sini
    setShowAlert(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Arrow Back */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-4 top-4 p-2 rounded-full z-50"
      >
        <Image
          source={require("../assets/icons/vectorart-backblue.png")}
          className="w-[30] h-[30]"
        />
      </TouchableOpacity>

      <AlertCustom
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        title="Siap Tuan Muda!"
        message="Berita berhasil diterbitkan dan sudah bisa dibaca oleh pengguna lain. Terimakasih!"
        buttonText="Mengerti"
        redirectTo="/newsPemerintah"
      />

      {/* Form */}
      <ScrollView
        className="flex-1 bg-white px-4 py-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-2xl mt-12 mb-6 font-poppins-extrabold">
          Buat Berita
        </Text>

        {/* Judul */}
        <TextInput
          value={form.title}
          onChangeText={(text) => setForm((prev) => ({ ...prev, title: text }))}
          placeholder="Enter title"
          className="border rounded-md px-4 py-3 mb-1 text-base font-poppins"
          style={[
            { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 4 },
            errors.title ? { borderColor: "red" } : { borderColor: "#d1d5db" },
          ]}
        />

        {/* Kategori */}
        <TouchableOpacity
          onPress={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
          className="border rounded-md px-4 py-3 mb-1 flex-row justify-between items-center"
          style={[
            { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 4 },
            errors.category
              ? { borderColor: "red" }
              : { borderColor: "#d1d5db" },
          ]}
        >
          <Text className="text-base text-gray-700 font-poppins">
            {form.category || "Enter Tags"}
          </Text>
        </TouchableOpacity>

        {categoryDropdownVisible && (
          <View className="border border-black rounded-md mb-4 bg-white shadow z-50">
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setForm((prev) => ({ ...prev, category: cat }));
                  setCategoryDropdownVisible(false);
                }}
                className="px-4 py-3 border-b border-gray-200"
              >
                <Text className="text-base text-black font-poppins">{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Deskripsi */}
        <TextInput
          value={form.description}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, description: text }))
          }
          placeholder="Enter Description"
          multiline
          numberOfLines={4}
          className="border rounded-md px-4 py-3 mb-1 text-base text-gray-700 font-poppins"
          style={[
            {
              textAlignVertical: "top",
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              marginBottom: 4,
            },
            errors.description
              ? { borderColor: "red" }
              : { borderColor: "#d1d5db" },
          ]}
        />

        {/* Upload Gambar */}
        <UploadImage images={form.images} setForm={setForm} />

        {Object.keys(errors).length > 0 && (
          <Text
            className="font-poppins"
            style={{
              color: "#B91C1C",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              textAlign: "center",
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
          <Text className="text-white font-medium tracking-widest font-poppins-semibold">
            SUBMIT FORM
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
