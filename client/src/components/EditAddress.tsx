import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    HStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    Spinner,
    Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
    createAddress,
    deleteAddress,
    getAddressByUser,
    getCountries,
    getStateById,
    updateAddress,
} from "../services/addressesService";
import { AuthContext } from "./GlobalState";

export interface NewAddress {
    address1: string;
    address2: string;
    city: string;
    postal_code: string;
    address_phone: string;
    user_phone: string;
    state_id: number;
    user_id: number;
}

export interface State {
    id: number;
    name: string;
    country_id: number;
}

export interface Address {
    id?: number;
    address1: string;
    address2: string;
    city: string;
    postal_code: string;
    address_phone: string;
    user_phone: string;
    state_id: number;
    user_id: number;
    state?: State;
}

export interface Country {
    id: number;
    name: string;
}

interface EditAddressState {
    data: Array<Address>;
}

const EditAddress = () => {
    const context = useContext(AuthContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading, setLoading] = useState(true);

    const [addresses, setAddresses] = useState([] as any);

    const [trigger, setTrigger] = useState(false);

    const [isEditing, setEditing] = useState(true);

    const [states, setStates] = useState<Array<State>>();
    const [countries, setCountries] = useState<Array<Country>>();

    const [newAddress, setNewAdress] = useState<NewAddress>({
        address1: "",
        address2: "",
        city: "",
        postal_code: "",
        address_phone: "",
        user_phone: "",
        state_id: 0,
        user_id: 0,
    });

    useEffect(() => {
        const fetchAddressData = async () => {
            setLoading(true);
            const res = await getAddressByUser(
                context?.userData?.id.toString() as string
            );
            setAddresses(res);

            const resCountries = await getCountries();
            setCountries(resCountries);
            setLoading(false);
        };

        fetchAddressData();
    }, [context, trigger]);

    const handleOnChangeEditInput = (e: any, index: number) => {
        addresses[index][e.target.name as keyof Address] = e.target.value;
        setAddresses(addresses);
    };

    const handleEditNewInput = (e: any) => {
        setNewAdress({
            ...newAddress,
            user_id: context.userData.id,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnDeleteAddress = async (id: string) => {
        setLoading(true);
        const res = await deleteAddress(id);
        setLoading(false);
        setTrigger(!trigger);
    };

    const handleOnCreateAddress = async () => {
        setLoading(true);
        const res = await createAddress(newAddress);
        setLoading(false);
        setTrigger(!trigger);
    };

    const handleOnEditAddress = async (id: string, index: number) => {
        setLoading(true);
        const res = await updateAddress(id, addresses[index]);
        setLoading(false);
        setTrigger(!trigger);
    };

    const handleChangeCountry = async (country_id: string) => {
        const resStates = await getStateById(country_id);
        setStates(resStates);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full">
                <Spinner></Spinner>
            </div>
        );
    } else {
        return (
            <div className="pt-4">
                <Button
                    colorScheme={"yellow"}
                    onClick={onOpen}
                    size={"sm"}
                    mb={8}
                >
                    Crear nueva dirección
                </Button>
                {addresses.map((element: Address, i: number) => {
                    return (
                        <div key={i} className="mb-14">
                            <div className="flex justify-between">
                                <Heading mb={2}>Dirección #{i + 1}</Heading>
                                <div>
                                    <Button
                                        onClick={() =>
                                            handleOnDeleteAddress(
                                                element.id.toString()
                                            )
                                        }
                                        colorScheme={"red"}
                                        size={"sm"}
                                        mr={4}
                                    >
                                        Eliminar
                                    </Button>
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
                                        <FormControl id="address1" isRequired>
                                            <FormLabel htmlFor="address1">
                                                Dirección 1
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={element.address1}
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="address1"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="address2" isRequired>
                                            <FormLabel htmlFor="address2">
                                                Dirección 2
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={element.address2}
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="address2"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="city" isRequired>
                                            <FormLabel htmlFor="city">
                                                Ciudad
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={element.city}
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="city"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            id="postal_code"
                                            isRequired
                                        >
                                            <FormLabel htmlFor="postal_code">
                                                Código postal
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={
                                                    element.postal_code
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="postal_code"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Box>
                                        <FormControl id="user_phone" isRequired>
                                            <FormLabel htmlFor="user_phone">
                                                Telefono personal
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={
                                                    element.user_phone
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="user_phone"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            id="address_phone"
                                            isRequired
                                        >
                                            <FormLabel htmlFor="address_phone">
                                                Telefono de residencia
                                            </FormLabel>
                                            <Input
                                                isDisabled={isEditing}
                                                defaultValue={element.state_id}
                                                onChange={(e) =>
                                                    handleOnChangeEditInput(
                                                        e,
                                                        i
                                                    )
                                                }
                                                name="address_phone"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="country" isRequired>
                                            <FormLabel htmlFor="country">
                                                Pais
                                            </FormLabel>
                                            <Select
                                                isDisabled={isEditing}
                                                name="country"
                                                id="country"
                                                onChange={(e) =>
                                                    handleChangeCountry(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {countries?.map(
                                                    (element, i) => {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={
                                                                    element.id
                                                                }
                                                            >
                                                                {element.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="state" isRequired>
                                            <FormLabel htmlFor="state">
                                                Departamento
                                            </FormLabel>
                                            {isEditing ? (
                                                <Input
                                                    onChange={(e) =>
                                                        handleOnChangeEditInput(
                                                            e,
                                                            i
                                                        )
                                                    }
                                                    defaultValue={
                                                        element.state.name
                                                    }
                                                    name="state_id"
                                                    id="state_id"
                                                    isDisabled={isEditing}
                                                />
                                            ) : (
                                                <Select
                                                    isDisabled={isEditing}
                                                    name="state_id"
                                                    id="state_id"
                                                    onChange={(e) =>
                                                        handleOnChangeEditInput(
                                                            e,
                                                            i
                                                        )
                                                    }
                                                >
                                                    {states?.map(
                                                        (element, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        element.id
                                                                    }
                                                                >
                                                                    {
                                                                        element.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            )}
                                        </FormControl>
                                    </Box>
                                </HStack>
                                {isEditing ? (
                                    <></>
                                ) : (
                                    <Button
                                        mt={6}
                                        size={"sm"}
                                        onClick={() =>
                                            handleOnEditAddress(
                                                element.id.toString(),
                                                i
                                            )
                                        }
                                        colorScheme={"green"}
                                    >
                                        Guardar
                                    </Button>
                                )}
                            </form>
                        </div>
                    );
                })}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Nueva dirección</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                <HStack>
                                    <Box>
                                        <FormControl id="address1" isRequired>
                                            <FormLabel htmlFor="address1">
                                                Dirección 1
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="address1"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="address2" isRequired>
                                            <FormLabel htmlFor="address2">
                                                Dirección 2
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="address2"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Box>
                                        <FormControl id="city" isRequired>
                                            <FormLabel htmlFor="city">
                                                Ciudad
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="city"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            id="postal_code"
                                            isRequired
                                        >
                                            <FormLabel htmlFor="postal_code">
                                                Código postal
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="postal_code"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Box>
                                        <FormControl id="user_phone" isRequired>
                                            <FormLabel htmlFor="user_phone">
                                                Telefono personal
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="user_phone"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            id="address_phone"
                                            isRequired
                                        >
                                            <FormLabel htmlFor="address_phone">
                                                Telefono de residencia
                                            </FormLabel>
                                            <Input
                                                onChange={handleEditNewInput}
                                                name="address_phone"
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>

                                <HStack>
                                    <Box w={"full"}>
                                        <FormControl id="country" isRequired>
                                            <FormLabel htmlFor="country">
                                                Pais
                                            </FormLabel>
                                            <Select
                                                name="country"
                                                id="country"
                                                onChange={(e) =>
                                                    handleChangeCountry(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {countries?.map(
                                                    (element, i) => {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={
                                                                    element.id
                                                                }
                                                            >
                                                                {element.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box w={"full"}>
                                        <FormControl id="state_id" isRequired>
                                            <FormLabel htmlFor="state_id">
                                                Departamento
                                            </FormLabel>
                                            <Select
                                                name="state_id"
                                                id="state_id"
                                                onChange={(e) =>
                                                    handleEditNewInput(e)
                                                }
                                            >
                                                {states?.map((state, i) => {
                                                    return (
                                                        <option
                                                            key={i}
                                                            value={state.id}
                                                        >
                                                            {state.name}
                                                        </option>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </HStack>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={handleOnCreateAddress}
                            >
                                Crear
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        );
    }
};

export default EditAddress;
