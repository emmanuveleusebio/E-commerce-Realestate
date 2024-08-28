"use client";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { previouMessages } from "../features/dataSlice";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import Image from "next/image";

export default function MessagePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const messagesInvolved = useSelector((state) => state.globalValues.chatList);

  const getChat = async (user) => {
    NProgress.start();
    try {
      const prevmessages = await axios.get("api/chat", {
        params: {
          method: "personalChat",
          seller: user._id,
        },
      });
      console.log(prevmessages.data.messages, 'pppppppppppppppp')
      dispatch(previouMessages(prevmessages.data.messages));
      router.push("chatPage");
    } catch (error) {
      console.log(error, "error while fetching data");
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-6">
      {/* Header */}
      <div className="text-2xl font-semibold mb-4">Your Chats</div>

      {/* Chat List */}
      <div className="flex-grow bg-white shadow-md rounded-lg p-4">
        {/* Center the messages container */}
        <div className="w-full max-w-3xl mx-auto">
          {messagesInvolved.map((content, index) => (
            <div
              key={index}
              className="flex items-center p-3 mb-3 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer transition-all"
              onClick={() => getChat(content)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src={content.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium text-gray-800">
                  {content.username}
                </div>
                <div className="text-sm text-gray-500">
                  Last message snippet or timestamp...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
