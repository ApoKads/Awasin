import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import UploadImage from "./components/UploadImage";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlertCustom from "./components/alertCustom";

const LaporanForm = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    type: "",
    location: "",
    customType: "",
    images: [],
    latitude: null,
    longitude: null,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(""); // hanya 1 error aktif
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const categories = ["Jalanan", "Gedung", "Taman", "Lainnya"];

  useEffect(() => {
    const { title, desc, type, images, latitude, longitude, address } = params;

    if (title || desc || type || images || latitude || longitude || address) {
      setForm((prevForm) => ({
        ...prevForm,
        title: title || prevForm.title,
        desc: desc || prevForm.desc,
        type: type || prevForm.type,
        images: images ? JSON.parse(images) : prevForm.images,
        latitude: latitude ? parseFloat(latitude) : prevForm.latitude,
        longitude: longitude ? parseFloat(longitude) : prevForm.longitude,
        location: address || prevForm.location,
      }));
    }
  }, [
    params.title,
    params.desc,
    params.type,
    params.images,
    params.latitude,
    params.longitude,
    params.address,
  ]);

  const handleLocation = () => {
    router.push({
      pathname: "/maps",
      params: {
        ...form,
        images: JSON.stringify(form.images),
      },
    });
  };

  const validateForm = () => {
    if (!form.title) {
      setError("Judul harus diisi.");
      return false;
    }
    if (!form.type) {
      setError("Jenis fasilitas harus dipilih.");
      return false;
    }
    if (!form.desc) {
      setError("Deskripsi harus diisi.");
      return false;
    }
    if (form.images.length === 0) {
      setError("Minimal 1 gambar harus diupload.");
      return false;
    }
    if (!form.type) {
      setError("Jenis fasilitas harus dipilih.");
      return false;
    }
    if (form.type === "lainnya" && !form.customType) {
      setError("Jenis lainnya harus diisi.");
      return false;
    }

    setError(""); 
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowAlert(true);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center px-6 pt-4">
          <TouchableOpacity
            onPress={() => router.replace('/postPage')}
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
            message="Kerusakan berhasil dilaporkan, Tim kami akan segera meninjau laporan Anda. Terimakasih!"
            buttonText="Mengerti"
            redirectTo="/postPage"
          />

          <Text className="text-3xl text-gray-800 font-bold mb-10 mt-12 font-poppins-bold">
            Buat Laporan
          </Text>

          <View className="w-full flex-1">
            {/* Title */}
            <TextInput
              className={`border rounded-md px-4 py-2 w-full h-[55] text-[1rem] mb-5 font-poppins ${
                error === "Judul harus diisi."
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              placeholder="Title"
              placeholderTextColor="#A0AEC0"
              value={form.title}
              onChangeText={(text) => {
                setForm((prevForm) => ({ ...prevForm, title: text }));
                if (error) setError(""); // hapus error saat user edit
              }}
            />

            {/* Dropdown */}
            <TouchableOpacity
              className={`border rounded-lg px-4 py-4 mb-5 bg-white ${
                error === "Jenis fasilitas harus dipilih."
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              onPress={() => setCategoryDropdownVisible((prev) => !prev)}
            >
              <Text
                className={`text-base font-poppins ${
                  form.type ? "text-black" : "text-[#A0AEC0]"
                }`}
              >
                {form.type
                  ? form.type.charAt(0).toUpperCase() + form.type.slice(1)
                  : "Pilih Jenis"}
              </Text>
            </TouchableOpacity>

            {categoryDropdownVisible && (
              <View className="border border-gray-400 rounded-md mb-4 bg-white shadow z-50">
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setForm((prev) => ({
                        ...prev,
                        type: cat.toLowerCase(),
                        customType: "",
                      }));
                      setCategoryDropdownVisible(false);
                      if (error) setError("");
                    }}
                    className="px-4 py-3 border-b border-gray-200"
                  >
                    <Text className="text-base text-black font-poppins">
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Custom Type */}
            {form.type === "lainnya" && (
              <TextInput
                className={`border rounded-md px-4 py-2 w-full h-[55] text-[1rem] mb-5 font-poppins ${
                  error === "Jenis lainnya harus diisi."
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="Tulis jenis fasilitas lainnya"
                placeholderTextColor="#A0AEC0"
                value={form.customType}
                onChangeText={(text) => {
                  setForm((prevForm) => ({ ...prevForm, customType: text }));
                  if (error) setError("");
                }}
              />
            )}

            {/* Description */}
            <TextInput
              className={`border rounded-md p-4 w-full h-[100] mb-5 font-poppins ${
                error === "Deskripsi harus diisi."
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              placeholder="Description"
              placeholderTextColor="#A0AEC0"
              multiline
              textAlignVertical="top"
              value={form.desc}
              onChangeText={(text) => {
                setForm((prevForm) => ({ ...prevForm, desc: text }));
                if (error) setError("");
              }}
            />

            {/* Location */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center w-full mb-5"
              onPress={handleLocation}
            >
              <View className="flex flex-row items-center gap-[10] w-[200]">
                <Image
                  source={require("../assets/icons/vectorart-locationblue.png")}
                  className="w-[40] h-[40]"
                />
                <Text className="text-md text-black font-poppins">
                  Tambah Lokasi
                </Text>
              </View>
              <View className="flex justify-center items-center w-[35] h-[35] rounded-md bg-[#102E4A]">
                <Image
                  source={require("../assets/icons/vectorart-panahwhite.png")}
                  className="w-[10] h-[10]"
                />
              </View>
            </TouchableOpacity>

            {form.location && (
              <Text className="border border-gray-400 rounded-md px-4 py-2 w-full h-[55] mb-5 font-poppins">
                {form.location}
              </Text>
            )}

            {/* Upload Image */}
            <UploadImage images={form.images} setForm={setForm} />

            {/* Single Error Message */}
            {error ? (
              <Text className="text-red-500 text-center mb-4">{error}</Text>
            ) : null}

            {/* Submit Button */}
            <TouchableOpacity
              className="rounded-lg bg-[#102E4A] py-3 w-full mt-2"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-poppins-bold">
                Submit Form
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LaporanForm;
