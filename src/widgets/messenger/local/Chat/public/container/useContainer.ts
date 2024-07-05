import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
  useGetDialogMessagesQuery,
  useSendMessageMutation,
  useUpdateMessagesStatusMutation
} from "@/services/messengerService/messengerEndpoints";
import { usePublishPostImageMutation } from "@/services/postService/postEndpoints";
import { useGetPublicUserProfileQuery } from "@/services/publicService/publicEndpoints";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { MessengerFormSchema, messengerSchema } from "@/widgets/messenger/local/messengerSchema/messengerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

export const useContainer = () => {
  const {t} =useTranslation()
  const {
    clearErrors,
    control,
    formState: {
      errors
    },
    setValue,
    trigger,
    watch
  } = useForm<MessengerFormSchema>({
    defaultValues: {
      message: ""
    },
    mode: "onChange",
    resolver: zodResolver(messengerSchema)
  });

  const message = watch("message");
  const imageError = errors?.userPhoto?.message

  const { query } = useRouter();
  const sent = query?.sent as string || "";

  const { data: me } = useGetMeQuery() as {
    data: UserType
  };
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);
  const { data: dialogData, isFetching: isFetchingDialogData, isLoading: isLoadingDialogData } = useGetDialogMessagesQuery({
    cursor: cursor,
    dialogPartnerId: +sent,
    pageSize: 15,
    searchName: undefined
  }, { skip: !sent });
  const { data: dialogPartnerData } = useGetPublicUserProfileQuery({ profileId: +sent }, { skip: !sent });
  const [sendMessage] = useSendMessageMutation();
  const [updateMessage] = useUpdateMessagesStatusMutation();
  const [uploadUserImage] = usePublishPostImageMutation();
  const dialogMessages = dialogData?.items;
  const isLoadingChat = isLoadingDialogData || isFetchingDialogData;
  const { userId } = me;

  const extraActionsUserPhoto = async () => {
    const success = await trigger("userPhoto");
    const file = watch("userPhoto");

    if (file) {
      const badCase = "";
      const img = success ? URL.createObjectURL(file) : badCase;

      if (!errors.userPhoto) {
        setImage(img);
      }
    }
  };

  const onSendMsgHandler = async () => {
    if (image && sent) {
      const formData = new FormData();

      const response = await fetch(image);

      const blob = await response.blob();
      const file = new File([blob], "postPhoto", { type: "image/jpeg" });

      formData.append("file", file);

      uploadUserImage(formData).unwrap().then(res => {
        if (!res.images[0].url) {
          return;
        }
        if (message.trim()) {
          const tempMsg = res.images[0].url + "@,@" + message + "@,@";

          sendMessage({ message: tempMsg, receiverId: +sent });

          setValue("message", "");
          setImage(undefined);
          setValue("userPhoto", undefined);
        } else {
          sendMessage({ message: res.images[0].url, receiverId: +sent });

          setImage(undefined);
          setValue("userPhoto", undefined);
        }
      }).catch(()=> alert('EROORRRRRSSSS'))
    } else {
      if (sent && message.trim()) {
        sendMessage({ message, receiverId: +sent });
        setValue("message", "");
        setValue("userPhoto", undefined);
        clearErrors('userPhoto')
      }
    }

  };
  const cursorRef = useRef<IntersectionObserver | null>(null);
  const lastElRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingChat) {
      return;
    }
    if (cursorRef.current) {
      cursorRef.current.disconnect();
    }
    cursorRef.current = new IntersectionObserver(entries => {

      if (entries[0].isIntersecting) {
        if (entries[0].target.id) {
          setCursor(+entries[0].target.id);
        }
      }
    });

    if (node) {
      cursorRef.current.observe(node);
    }
  }, [isLoadingChat]);


  useEffect(() => {
    const unreadMsgs =
      dialogMessages?.reduce((acc, curr) => {
        if (curr.status !== "READ" && curr.receiverId === userId) {
          acc.push(curr.id);
        }

        return acc;
      }, [] as number[]) || [];

    if (unreadMsgs?.length) {
      updateMessage({ ids: unreadMsgs });
    }
  }, [dialogMessages?.length]);

  const onClickDelImage = () => {
    setImage(undefined)
    setValue('userPhoto', undefined)
  }

  return { control,dialogMessages, dialogPartnerData, extraActionsUserPhoto, image, imageError, isLoadingChat, lastElRef, message, onClickDelImage, onSendMsgHandler, t, userId };
};
