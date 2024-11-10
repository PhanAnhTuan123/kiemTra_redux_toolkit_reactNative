import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slices/dataSlice";
const Item = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => navigation.navigate("BikeDetail", { item: data })}
    >
      <View style={{ width: 108, height: 124 }}>
        <Image source={data.img} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={{ fontSize: 20 }}>{data.name}</Text>
      <Text style={{ fontSize: 20 }}>
        <Text style={{ color: "#F7BA83" }}>$</Text> {data.cost}
      </Text>
    </Pressable>
  );
};

export default function BikeList({ navigation }) {
  const [stateBtn, setStateBtn] = useState("All");
  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const handleCate = (cate) => {
    if (cate === "All") {
      setFilter(data);
    } else {
      setFilter(data.filter((item) => item.cate === cate));
    }
    setStateBtn(cate);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFilter(data);
    }
  }, [data]);

  if (loading) return <ActivityIndicator size="large" color={"red"} />;
  if (error) return <Text>Error: {error}</Text>;
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 27 }}>
        <Text style={{ fontSize: 25 }}>The world’s Best Bike</Text>
      </View>
      <View
        style={{
          marginTop: 44,
          flexDirection: "row",
          gap: 27,
          justifyContent: "center",
        }}
      >
        {["All", "RoadBike", "Mountain"].map((cate) => (
          <Pressable
            key={cate}
            style={[
              styles.button,
              stateBtn === cate
                ? { borderColor: "#E9414187" }
                : { borderColor: "#000" },
            ]}
            onPress={() => handleCate(cate)}
          >
            <Text
              style={[
                styles.text,
                stateBtn === cate
                  ? { color: "#E9414187" }
                  : { color: "#BEB6B6" },
              ]}
            >
              {cate}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        style={{ flex: 7, marginTop: 20 }}
        data={filter}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.btnGroup}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("AddProductScreen")}
        >
          <Text style={[styles.font, { color: "#fff" }]}>Add Product</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    flex: 1,
  },
  button: {
    width: 110,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
  },
  itemContainer: {
    borderRadius: 10,
    width: 167,
    height: 200,
    backgroundColor: "#F7BA8326",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btnGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#E94141",
    borderRadius: 30,
    paddingHorizontal: 83,
    paddingVertical: 11,
  },
});
