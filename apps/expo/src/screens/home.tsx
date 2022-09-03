import { SafeAreaView, View, Text, Button, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-gray-800">{post.title}</Text>
      <Text className="text-gray-600">{post.content}</Text>
    </View>
  );
};

export const HomeScreen = () => {
  const { data, refetch } = trpc.post.all.useQuery();
  const { data: response, mutate, error } = trpc.post.add.useMutation();
  const client = trpc.useContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log(error)

  return (
    <SafeAreaView>
      <View className="h-full w-full py-8 px-4">
        <Text className="text-5xl font-bold">Create T3 Turbo</Text>
        <TextInput
          onChangeText={setTitle}
          value={title}
          placeholder="Title..."
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <TextInput
          onChangeText={setContent}
          value={content}
          placeholder="Content..."
          className="border border-gray-300 rounded-md p-2 w-full"
        />


        <Button
          title="Add post"
          onPress={() =>
            mutate(
              { content: content, title: title },
              { onSuccess: () => client.post.all.invalidate() }
            )
          }
        />

        <Button title="Refetch stuff" onPress={() => refetch()} />

        <FlashList
          data={data}
          estimatedItemSize={20}
          renderItem={(p) => <PostCard post={p.item} />}
        />
      </View>
    </SafeAreaView>
  );
};
