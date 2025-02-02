import { MaterialIcons } from "@expo/vector-icons"
import { useContext, useEffect, useState } from "react"
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, View } from "react-native"
import { color } from "react-native-reanimated"
import DevSelector from "../../../components/ProfileSections/Projects/DevSelector"
import ButtonComponent from "../../../components/shared/Button"
import FeedbackTextInput from "../../../components/shared/FeedbackInput"
import IDevMinimal from "../../../interfaces/IDev"
import { AuthContext } from "../../../store/context/Auth.context"
import colors from "../../../styles/colors"

import styles from './style'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../../config/firebase'

import * as githubService from '../../../services/github.service'
import * as projectService from '../../../services/project.service'
import { useFocusEffect } from "@react-navigation/native"
import { GithubRepository } from "../../../interfaces/IGithubRepository"
import { Picker } from "@react-native-picker/picker"
import IProject from "../../../interfaces/IProject"
import PickerComponent from "../../../components/shared/Picker"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

const ProjectRegisterPage : React.FC<{ route : any, navigation : any }> = ({route, navigation}) => {
    const authContext = useContext(AuthContext)
    
    const [uploading, setUploading] = useState(false)
    const [repos, setRepos] = useState<GithubRepository[]>([])
    const [formValues, setFormValues] = useState<IProject>({
        name : '',
        bannerURI : '',
        githubRepository : undefined,
        desc : '',
        openSource : false,
        members : [
            authContext?.userData
        ]
    })

    const getProjectData = async () => {
        const projectId = route.params?.projectId;


        if (!projectId) 
            return;

        const res= await projectService.getById(projectId)
        setFormValues({
            name : res.data.name,
            bannerURI : res.data.bannerURI,
            desc : res.data.desc,
            githubRepository : res.data.githubRepository,
            openSource : res.data.openSource,
            members : res.data.members
        })
    }

    const getRepos = async () => {
        const res = await githubService.listRepositoriesFromUser(authContext?.userData.githubUsername);
        
        setRepos(res.map((repo : any) => {
            return {
                id : repo.id,
                name : repo.name,
                fullName : repo.full_name,
                description : repo.description,
                url : repo.html_url
            } as GithubRepository
        }))
    }

    const getRepoOptions = () : { label : string, value : string }[] => {
        return repos.map((repo) => { 
            return { 
                label : repo.fullName,
                value : repo.id
            }
        })
    }

    const selectRepository = (id : string) => {
        const selected = repos.find((repo) => repo.id === id )

        setFormValues({
            ...formValues,
            githubRepository : selected
        })
    }

    const handleTextChange = (value : string, key : keyof typeof formValues) => {
        setFormValues({
            ...formValues,
            [key] : value
        })
    }

    const addTeamMember = (member : IDevMinimal) => {
        if (member.id === authContext?.userData.id)
            return

        if (formValues.members.find(m => m.id === member.id))
            return

        setFormValues({
            ...formValues,
            members : [...formValues.members, member]
        })
    }

    const removeTeamMember = (member : IDevMinimal) => {
        if (member.id === authContext?.userData.id)
            return

        setFormValues({
            ...formValues,
            members : formValues.members.filter((m) => m.id != member.id)
        })
    }

    const pickImage = async () => {
        if (uploading) return

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing : true,
            aspect : [ 3, 1 ],
            quality : 1
        });

        if (!result.cancelled)

        upload(result.uri)
    }

    const upload = async (uri : string) => {
        setUploading(true)

        try {
            const res = await fetch(uri)
            const blob = await res.blob()
            const fileName = uri.substring(uri.lastIndexOf('/')+1)

            const uploaded = await firebase.storage().ref().child('projects/').child(fileName).put(blob)

            setFormValues({
                ...formValues,    
                bannerURI : await uploaded.ref.getDownloadURL()
            })
        } catch (err) {
            console.log(err)
            Toast.show({ type : ALERT_TYPE.DANGER, title : 'Erro ao fazer upload! tente novamente mais tarde'})

        }

        setUploading(false)
    }

    const saveProject = async () => {
        const projectId = route?.params?.projectId

        const body = {
            id : projectId,
            ...formValues
        }

        const res = (projectId)?
            await projectService.update(body, projectId) 
            : await projectService.create(body)

        if (!res.hasError) {
            navigation.goBack()
        } else {
            Toast.show({ type : ALERT_TYPE.DANGER, title : 'Erro ao salvar projeto! tente novamente mais tarde'})
        }
    }

    const confirmProjectDelete = () => {
        Alert.alert(
            'Deletar projeto',
            "Deletar esse projeto cortará qualquer relação com os posts existentes, tem certeza que deseja deletar esse projeto?",
            [
                {
                    text : 'Cancelar',
                    style : 'cancel'
                },
                {
                    text : 'Deletar',
                    style : 'destructive',
                    onPress : deleteProject
                }
            ]
        )
    }

    const deleteProject = async () => {
        await projectService.deleteProject(route.params.projectId)

        navigation.goBack()
    }

    useEffect(() => { getRepos(), getProjectData() },[])

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={styles.page}
            >
            <View style={styles.header}>
                <View style={styles.headerLeftContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-arrow-left" color="#FFF" size={32} />
                    </Pressable>
                    <Text style={styles.title}>Novo projeto</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.formWrapper}>
                <View style={styles.bannerContainer}>
                    {
                        formValues.bannerURI && 
                        <Image style={{ flex : 1 }} source={{ uri : formValues.bannerURI }} />
                    }
                    <Pressable style={styles.addBannerBtn} onPress={pickImage}>
                        <MaterialIcons name="add-a-photo" size={16} color="#FFF" />
                    </Pressable>
                </View>

                <View style={styles.divisor}/>

                <FeedbackTextInput value={formValues.name} style={styles.input} placeholder="Nome" onChangeText={(value) => handleTextChange(value, 'name')} />

                <PickerComponent style={styles.input} value={formValues.githubRepository?.id} onChange={selectRepository}  >
                    {
                        getRepoOptions().map((optionProps) =>
                            <Picker.Item {...optionProps} key={optionProps.value}/>
                        )
                    }
                </PickerComponent>

                <FeedbackTextInput 
                    value={formValues.desc}
                    style={{...styles.descInput, ...styles.input}}
                    inputStyle={{ justifyContent : "flex-start", alignItems : "flex-start"}}  
                    placeholder="Descrição" 
                    multiline 
                    maxLength={255} 
                    maxLines={6} 
                    onChangeText={(value) => handleTextChange(value, 'desc')}  
                />
            
                <View style={{ alignItems : "center", flexDirection : 'row', }}>
                    <Text style={styles.label}>Open Source :</Text>
                    <Switch
                        trackColor={{ false: colors.GRAY, true: colors.PRIMARY }}
                        thumbColor={formValues.openSource ? '#FFF' : colors.LIGHT_GRAY}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setFormValues({ ...formValues, openSource: !formValues.openSource})}
                        value={formValues.openSource}
                    />
                </View>

                <DevSelector onSelect={addTeamMember} ignoreIds={formValues.members.map((m) => m.id)}/>

                <View style={styles.divisor}/>

                {
                    formValues.members.map((dev : IDevMinimal) => 
                        <TeamMemberCard
                            key={dev.id} 
                            data={dev} 
                            onRemove={() => removeTeamMember(dev)}
                            canRemove={dev.id != authContext?.userData.id}
                        />
                    )
                }

                <View style={styles.btnContainer}>
                     <Pressable style={styles.saveBtn} onPress={saveProject}>
                         <MaterialIcons size={24} color="#FFF" name="save" style={{ marginRight : 8}}/>
                         <Text style={styles.saveBtnText}>Salvar</Text>
                     </Pressable>
                     {
                        route.params?.projectId &&
                        <Pressable style={styles.deleteBtn} onPress={confirmProjectDelete}>
                            <MaterialIcons size={24} color={colors.LIGHT_RED} name="delete-forever" style={{ marginRight : 8}}/>
                            <Text style={styles.deleteBtnText}>deletar</Text>
                        </Pressable>
                     }

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

interface TeamMemberCardProps {
    data : IDevMinimal
    onRemove : () => void
    canRemove ?: boolean
}

const TeamMemberCard : React.FC<TeamMemberCardProps> = ({ data, onRemove, canRemove }) => {
    return (
        <View style={styles.teamMemberCard}>
            <View style={{ flexDirection : 'row' }}>
                <Image style={styles.devPic} source={{ uri : data.profilePicUrl }} />

                <View>
                    <Text style={styles.devName}>{data.name}</Text>
                    <Text style={styles.devGithub}>{data.githubUsername}</Text>
                </View>
            </View>

            {   
                canRemove && 
                <Pressable onPress={onRemove}>
                    <MaterialIcons name="delete-forever" size={32} color={colors.LIGHT_RED} />
                </Pressable>
            }
            
        </View>
    )
}


export default ProjectRegisterPage
