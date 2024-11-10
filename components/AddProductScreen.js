import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addProductToApi } from "../slices/dataSlice";

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [cate, setCate] = useState("RoadBike");
  const [img, setImg] = useState("../assets/img/bike1.png");

  const dispatch = useDispatch();

  const handleAddProduct = () => {
    const newProduct = { name, cost, cate, img };
    dispatch(addProductToApi(newProduct))
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Cost</Text>
      <TextInput
        style={styles.input}
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
        placeholder="Enter product cost"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={cate}
        onChangeText={setCate}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Image Path</Text>
      <TextInput
        style={styles.input}
        value={img}
        onChangeText={setImg}
        placeholder="Enter image path"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
