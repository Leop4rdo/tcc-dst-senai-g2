import {Text, View,Image, Pressable} from "react-native"
import {MaterialIcons} from "@expo/vector-icons";
import LayoutWrapper from "../../../components/shared/LayoutWrapper";
import styles from "./style";
import Post from "../../../components/Post";
import ProfileEdit from "../../../components/ProfileEdit";
import ButtonComponent from "../../../components/shared/Button";


const ProfilePage: React.FC<{ navigation : any }> = ({navigation}) => {
    return(
        <LayoutWrapper navigation={navigation}>
            <View style={styles.page}>

                <View style={styles.profileContainer}>
                    <Image source={{uri:'https://arquivei.com.br/blog/wp-content/uploads/2017/09/tipos-empresas-1200_og.jpg'}}style={styles.backgroundImage}></Image>

                    <View style={styles.profileEdit}>
                        <Image source={{uri:'https://midias.correiobraziliense.com.br/_midias/jpg/2013/11/15/675x450/1_cbifot151120135622-18891928.jpg?20220922092144?20220922092144'}} style={styles.photoUser}></Image>
                        <Pressable onPress={() => navigation.navigate('profile-edit')} style={styles.buttonEdit}>
                            <MaterialIcons name="add" size={16} color='#FFF' />
                            <Text style={styles.textButton}>Seguir </Text>
                        </Pressable>
                    </View>

                    <View style={styles.profileData}>
                        <Text style={styles.devName}>Daiane Silva</Text>
                        <Text style={styles.devBio}>bio skdjkajdlkjsakdj</Text>
                    </View>
                </View>
                
                <View style={styles.profileDice}>
                    <View style={styles.dice}>
                        <Text style={styles.amount}>40</Text>
                        <Text style={styles.text}>Seguidores</Text>
                    </View>
                    <View style={styles.dice}>
                        <Text style={styles.amount}>40</Text>
                        <Text style={styles.text}> Seguindo</Text>
                    </View>
                </View>
                

                <View style={styles.publicationData}>
                    <Pressable style={styles.publications}>
                        <Text style={styles.textPublications}>Informações gerais</Text>
                    </Pressable>

                    <Pressable>
                        <Text style={styles.textPublications}>Posts</Text>
                    </Pressable>

                    <Pressable>
                        <Text style={styles.textPublications}>Artigos</Text>
                    </Pressable>
                </View>

                <ProfileEdit icon="star" text="Contato">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="email" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>john.doe@devint.com</Text>
                 </View>
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="call" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>(XX) XXXXX-XXXX</Text>
                 </View>
                </ProfileEdit>

                <ProfileEdit icon="star" text="Sobre">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="calendar_month" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>29/08/2099</Text>
                 </View>

                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="group" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>Masculino</Text>
                 </View>
                </ProfileEdit>

                <ProfileEdit icon="star" text="Foco de Carreira">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="email" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>Front-End</Text>
                 </View>
                </ProfileEdit>

                <ProfileEdit icon="star" text="Trabalho atual">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="email" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>Front-End</Text>
                 </View>
                </ProfileEdit>

                <ProfileEdit icon="star" text="Senioridade">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="email" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>Junior</Text>
                 </View>
                </ProfileEdit>

                <ProfileEdit icon="star" text="Habilidades">
                 <View style={styles.containerChildren}>
                    <MaterialIcons style={styles.icon} name="email" color={'#FFF'}></MaterialIcons>
                    <Text style={styles.textedit}>Junior</Text>
                 </View>
                </ProfileEdit>

                
                    
               

   
            </View>
        </LayoutWrapper>
    )

}

export default ProfilePage