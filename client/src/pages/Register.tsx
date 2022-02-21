import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Spinner,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { login, LoginUserState, register, RegisterUserState } from "../services/authService";

import { useCookies } from "react-cookie";

const Register = () => {
	const [, setCookie] = useCookies(["user-token"]);

	const toast = useToast()

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const [newUser, setNewUser] = useState<RegisterUserState>({
		first_name1: "",
		first_name2: "",
		last_name1: "",
		last_name2: "",
		email: "",
		phone: 0,
		user_name: "",
		password: "",
	});

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const res = await register(newUser);
		
		if (res) {
			const user: LoginUserState = {
				username: newUser.user_name,
				password: newUser.password,
			};
	
			const token = await login(user);
			setLoading(false);

			if (token) {
				toast({
					title: 'Exito',
					description: "Tu cuenta ha sido creada con exito",
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
				setCookie("user-token", token);
				navigate("/profile");
			}
		} else {
			toast({
				title: 'Error',
				description: "Ha habido un error con tus datos, por favor, revisalos",
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
			setLoading(false);
		};
	};

	return(
		<Flex minH={"100vh"} align={"center"} justify={"center"} bgColor={"#FFCF9B"} pt={"20"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={20} px={6}>
				<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={6}>
					<Stack mb={"6"}>
						<Heading fontSize={"4xl"} color="#FFA341">
							Registrate
						</Heading>
						<div>
							<Text fontSize={"md"} color={"gray.600"}>
								Ingresa estos datos sobre ti para poder crearte una cuenta
							</Text>
						</div>
					</Stack>
					<form onSubmit={handleOnSubmitForm}>
						<Stack spacing={3}>
							<HStack>
								<Box>
									<FormControl id="first_name1" isRequired>
										<FormLabel htmlFor="first_name1">
											Primer nombre
										</FormLabel>
										<Input
											onChange={
												handleOnChangeInput
											}
											name="first_name1"
											type="text"
											required
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="first_name2">
										<FormLabel htmlFor="first_name2">
											Segundo nombre
										</FormLabel>
										<Input
											onChange={
												handleOnChangeInput
											}
											name="first_name2"
											type="text"
										/>
									</FormControl>
								</Box>
							</HStack>
							<HStack>
								<Box>
									<FormControl id="last_name1" isRequired>
										<FormLabel htmlFor="last_name1">
											Primer apellido
										</FormLabel>
										<Input
											onChange={
												handleOnChangeInput
											}
											name="last_name1"
											type="text"
											required
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="last_name2">
										<FormLabel htmlFor="last_name2">
											Segundo apellido
										</FormLabel>
										<Input
											onChange={
												handleOnChangeInput
											}
											name="last_name2"
											type="text"
										/>
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="email" isRequired>
								<FormLabel htmlFor="email">
									Correo electronico
								</FormLabel>
								<Input
									onChange={handleOnChangeInput}
									name="email"
									type="email"
									required
								/>
							</FormControl>

							<FormControl id="phone" isRequired>
								<FormLabel htmlFor="phone">
									Numero de celular
								</FormLabel>
								<InputGroup>
									<InputLeftAddon>+57</InputLeftAddon>
									<Input
										onChange={handleOnChangeInput}
										name="phone"
										type="number"
										required
									/>
								</InputGroup>
							</FormControl>

							<FormControl id="birthday">
								<FormLabel htmlFor="birthday">
									Fecha de nacimiento
								</FormLabel>
								<Input
									// onChange={handleOnChangeInput}
									name="birthday"
									type="date"
								/>
							</FormControl>
							
							<FormControl id="user_name" isRequired>
								<FormLabel htmlFor="user_name">
									Nombre de usuario
								</FormLabel>
								<Input
									onChange={handleOnChangeInput}
									name="user_name"
									type="text"
									required
								/>
							</FormControl>

							<FormControl id="password" isRequired>
								<FormLabel htmlFor="password">
									Contraseñaco
								</FormLabel>
								<InputGroup>
									<Input
										onChange={handleOnChangeInput}
										required
										minLength={8}
										name="password"
										type={
											showPassword
												? "text"
												: "password"
										}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword(
													(showPassword) =>
														!showPassword
												)
											}
										>
											{showPassword ? (
												<ViewIcon />
											) : (
												<ViewOffIcon />
											)}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={1}>
								<div className="text-center">
									<Button
										type="submit"
										isDisabled={loading}
										size="md"
										bg={"#FFA341"}
										color={"white"}
										_hover={{
											bg: "yellow.600",
										}}
									>
										{loading ? (
											<Spinner />
										) : (
											<>Registrarse</>
										)}
									</Button>
								</div>
							</Stack>
							<Stack pt={3}>
								<Text align={"center"}>
									¿Ya tienes cuenta?{" "}
									<Link
										to="/login"
										className="text-[#FFA341]"
									>
										inicia sesión
									</Link>
								</Text>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
