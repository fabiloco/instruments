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
} from "@chakra-ui/react";
import { useState } from "react";

import { Link } from "react-router-dom";

interface LoginUserState {
    username: string;
    password: string;
}

const Login = () => {
    const [loading, setLoading] = useState(false);

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

    const handleOnSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("sending form", user);
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
											bg: "blue.500",
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
