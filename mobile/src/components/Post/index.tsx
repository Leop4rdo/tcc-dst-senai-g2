import {Image,View, Text, Pressable, FlatList, LayoutChangeEvent, } from "react-native"
import styles from "./styles"
import ButtonComponent from "../shared/Button"
import {MaterialIcons} from "@expo/vector-icons"
import colors from "../../styles/colors"
import { useState } from "react"
import AttachmentCarousel from "./AttachmentCarousel"
import * as postService from "../../services/post.service"
import { IPostListItem } from "../../interfaces/IPost"

interface IPostProps {
    data : IPostListItem,
    openComments : () => void
    openProfile : () => void
    openProject : () => void
}

const Post : React.FC<IPostProps> = ({ data, openComments, openProfile, openProject }) =>{
    const [liked, setLiked] = useState(data.alreadyHearted)

    const giveLike = async () => {
        const res = await postService.addHeart(data.id)

        setLiked(!liked)
    }

    return(
        <View style={styles.cardPost}>
            <Pressable style={styles.header} onPress={openProfile}>
                <Image style={styles.profilePic} source={{ uri : data.writter.profilePicUrl }}></Image>
                <View>
                    <Text style={styles.devName}>{data.writter.name}</Text>
                    <Text style={styles.devGithub}>{data.writter.githubUsername}</Text>
                </View>
            </Pressable>

            <View>
                <Text style={styles.content}>
                    {
                        data.content
                    }
                </Text>

                {
                    data.project &&
                    <Pressable onPress={openProject}>
                        <Text style={styles.projectLink}>&#60; {data.project.name} &#47;&#62;</Text>
                    </Pressable>
                }
            </View>

            { 
                data.attachments.length > 0 && 
                <AttachmentCarousel data={data.attachments}/> 
            }

            <View style={styles.footer}>
                <Pressable style={styles.footerButtonContainer} onPress={openComments}>
                    <MaterialIcons name='forum' size={24} color={colors.LIGHT_GRAY} />
                    <Text style={styles.footerButtonLabel}>{data.comments} comentários</Text>
                </Pressable>

                <Pressable style={styles.footerButtonContainer} onPress={giveLike}>
                    <Text style={styles.footerButtonLabel}>{(liked && !data.alreadyHearted) ? data.hearts+1 : (!liked && data.alreadyHearted) ? data.hearts-1: data.hearts}</Text>
                    <MaterialIcons name='favorite' size={24} color={(liked) ? colors.PRIMARY : colors.LIGHT_GRAY} />
                </Pressable>
            </View>
        </View>
    )
}

export default Post
