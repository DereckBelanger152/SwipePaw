import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Check } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Message as MessageType } from "@/types";
import { formatMessageTime } from "@/utils/dateUtils";

interface MessageProps {
  message: MessageType;
  isUser: boolean;
}

export default function Message({ message, isUser }: MessageProps) {
  // Format timestamp for display
  const formattedTime = formatMessageTime(message.timestamp);

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}
      >
        {/* Message content */}
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.otherText,
          ]}
        >
          {message.text}
        </Text>

        {/* Message attachments (images) */}
        {message.attachments && message.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            {message.attachments.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.attachmentImage}
                resizeMode="cover"
              />
            ))}
          </View>
        )}

        {/* Time and status for user messages */}
        <View style={styles.metaContainer}>
          <Text style={styles.timeText}>{formattedTime}</Text>

          {isUser && (
            <View style={styles.statusContainer}>
              {message.status === "read" ? (
                <View style={styles.readIcon}>
                  <Check size={12} color={Colors.secondary.green} />
                </View>
              ) : message.status === "delivered" ? (
                <Check size={12} color={Colors.text.tertiary} />
              ) : (
                <Check
                  size={12}
                  color={Colors.text.tertiary}
                  style={{ opacity: 0.5 }}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing.xs,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  otherContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.sm,
  },
  userBubble: {
    backgroundColor: Colors.primary.accent1,
  },
  otherBubble: {
    backgroundColor: Colors.ui.cardBackground,
  },
  messageText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: Colors.text.light,
  },
  otherText: {
    color: Colors.text.primary,
  },
  attachmentsContainer: {
    marginTop: Layout.spacing.xs,
  },
  attachmentImage: {
    width: "100%",
    height: 150,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.xs,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 2,
  },
  timeText: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    // @ts-ignore
    color: Colors.text.tertiary,
    marginRight: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readIcon: {
    flexDirection: "row",
  },
} as const);
