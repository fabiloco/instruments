import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import { useCookies } from "react-cookie";

interface LoginUserState {
    username: string;
    password: string;
}

const Login = () => {
    const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const toast = useToast();

	const [, setCookie] = useCookies(["user-token"]);

    const [user, setUser] = useState<LoginUserState>({
        username: "",
        password: "",
    });

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.preventDefault();
		setLoading(true);
		const token = await login(user);
		setLoading(false);
		if (token) {
			setCookie("user-token", token);
			navigate("/profile");
		} else {
			toast({
				title: "Algo ha salido mal",
				description: "Usuario y/o contraseña incorrectos",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
    };

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bgColor={"#FFCF9B"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
					<Stack mb={"6"}>
						<Heading fontSize={"4xl"} color="#FFA341">
							Inicia sesión
						</Heading>
						<div>
							<Text fontSize={"md"} color={"gray.600"}>
								Bievenido! Inicia sesión para obtener increibles
								descuentos y ofertas solo para ti
							</Text>
						</div>
					</Stack>
                    <form onSubmit={handleOnSubmitForm}>
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel htmlFor="username">
                                    Usuario
                                </FormLabel>
                                <Input
                                    onChange={handleOnChangeInput}
                                    name="username"
                                    type="username"
                                    required
                                    autoComplete={"username"}
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel htmlFor="password">
                                    Contraseña
                                </FormLabel>
                                <Input
                                    onChange={handleOnChangeInput}
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete={"current-password"}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                {/* <Stack
									direction={{ base: "column", sm: "row" }}
									align={"start"}
									justify={"space-between"}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={"blue.400"}>
										¿Olvidaste tu contraseña?
									</Link>
								</Stack> */}
								<div className="text-center">
									<Button
										isDisabled={loading}
										type="submit"
										bg={"#FFA341"}
										color={"white"}
										_hover={{
											bg: "yellow.600",
										}}
									>
										{loading ? (
											<Spinner />
										) : (
											<>Iniciar sesión</>
										)}
									</Button>
								</div>
                            </Stack>
                        </Stack>
                    </form>
					
					<Text fontSize={"sm"} color={"gray.600"} mt={"6"}>
						o si aun no tienes cuenta,{" "}
						<Link to={"/register"} className="text-[#FFA341]">
							registrate
						</Link>{" "}
						✌️
					</Text>
					
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
