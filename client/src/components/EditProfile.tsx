import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { editUser, getUserDataById } from "../services/userService";
import { AuthContext, UserData } from "./GlobalState";

export interface User {
    user_name: string;
    first_name1: string;
    first_name2: string;
    last_name1: string;
    last_name2: string;
    email: string;
    img_profile: string;
    phone: string;
}

interface EditProfileState {
    loading: boolean;
    userData: User;
}

const EditProfile = () => {
    const [editProfileState, setEditProfileState] = useState<EditProfileState>({
        loading: true,
        userData: {
            user_name: "",
            first_name1: "",
            first_name2: "",
            last_name1: "",
            last_name2: "",
            email: "",
            img_profile: "",
            phone: "",
        },
    });

    const toast = useToast();

    const context = useContext(AuthContext);

    const [isEditing, setEditing] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setEditProfileState({ ...editProfileState, loading: true });
            const res = await getUserDataById(
                context?.userData?.id.toString() as string
            );
            setEditProfileState({ loading: false, userData: res });
        };

        fetchProfile();
    }, []);

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditProfileState({
            ...editProfileState,
            userData: {
                ...editProfileState.userData,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleOnSendNewUserData = async (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const res = await editUser(
            context?.userData?.id.toString() as string,
            editProfileState.userData
        );
        if(res) {
            toast({
                title: "Exito",
                description: "El perfil se ha editado con exito",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            context?.setTriggerContext(!context.triggerContext);
        } else {
            toast({
                title: "Error",
                description: "Ha habido un error en los datos, por favor, revisalos",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        };
    };

    if (editProfileState.loading) {
        return (
            <div className="flex items-center justify-center w-full">
                <Spinner></Spinner>
            </div>
        );
    } else {
        return (
            <div className="pt-4">
                <div className="mb-14">
                    <div className="flex justify-between">
                        <Heading mb={2}>
                            Datos del usuario {context?.userData?.user_name}
                        </Heading>
                        <div>
                            <Button
                                onClick={() => setEditing(!isEditing)}
                                colorScheme={"blue"}
                                size={"sm"}
                            >
                                Editar
                            </Button>
                        </div>
                    </div>
                    <hr className="mb-6" />
                    <form>
                        <HStack mb={4}>
                            <Box>
                                <FormControl id="first_name1" isRequired>
                                    <FormLabel htmlFor="first_name1">
                                        Primer nombre
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={
                                            context?.userData?.first_name1
                                        }
                                        onChange={handleOnChangeInput}
                                        name="first_name1"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="first_name2" isRequired>
                                    <FormLabel htmlFor="first_name2">
                                        Segundo nombre
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={
                                            context?.userData?.first_name2
                                        }
                                        onChange={handleOnChangeInput}
                                        name="first_name2"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="last_name1" isRequired>
                                    <FormLabel htmlFor="last_name1">
                                        Primer apellido
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={
                                            context?.userData?.last_name1
                                        }
                                        onChange={handleOnChangeInput}
                                        name="last_name1"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="last_name2" isRequired>
                                    <FormLabel htmlFor="last_name2">
                                        Segundo apellido
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={
                                            context?.userData?.last_name2
                                        }
                                        onChange={handleOnChangeInput}
                                        name="last_name2"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="email" isRequired>
                                    <FormLabel htmlFor="email">
                                        Correo electronico
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={context?.userData?.email}
                                        onChange={handleOnChangeInput}
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="user_name" isRequired>
                                    <FormLabel htmlFor="user_name">
                                        Nombre de usuario
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={
                                            context?.userData?.user_name
                                        }
                                        onChange={handleOnChangeInput}
                                        name="user_name"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="phone" isRequired>
                                    <FormLabel htmlFor="phone">
                                        Celular
                                    </FormLabel>
                                    <Input
                                        isDisabled={isEditing}
                                        defaultValue={context?.userData?.phone}
                                        onChange={handleOnChangeInput}
                                        name="phone"
                                        type="text"
                                        required
                                    />
                                </FormControl>
                            </Box>
                            {/* <Box>
                                <FormControl id="img_profile" isRequired>
                                    <FormLabel htmlFor="img_profile">
                                        Imagen de perfil
                                    </FormLabel>
                                    <input
                                        disabled={isEditing}
                                        name="img_profile"
                                        type="file"
                                        accept="image/*"
                                        required
                                    />
                                </FormControl>
                            </Box> */}
                        </HStack>
                        {isEditing ? (
                            <></>
                        ) : (
                            <Button
                                mt={6}
                                size={"sm"}
                                type="button"
                                onClick={handleOnSendNewUserData}
                                colorScheme={"green"}
                            >
                                Guardar
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        );
    }
};

export default EditProfile;
