import { useContext } from "react";

import {
    Avatar,
    Container,
    Heading,
    Spinner,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";

import { AuthContext } from "../components/GlobalState";
import EditProfile from "../components/EditProfile";
import EditAddress from "../components/EditAddress";

const Profile = () => {
    const context = useContext(AuthContext);

    return (
        <div className="w-full pt-24 pb-24 bg-slate-100">
            {context!.userData?.state === "auth" ? (
                <Container maxW="container.xl">
                    <div className="relative bg-gray-300 rounded-t-lg h-80">
                        <div className="absolute flex -bottom-16 left-6">
                            <div className="p-2 bg-white">
                                <Avatar
                                    rounded={"none"}
                                    name={`${context?.userData?.first_name1} ${context?.userData?.last_name1}`}
                                    size={"2xl"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pt-20 pb-6 bg-white rounded-b-lg">
                        <div className="flex items-center">
                            <Heading className="mb-2">
                                {context?.userData?.first_name1}{" "}
                                {context?.userData?.first_name2}{" "}
                                {context?.userData?.last_name1}{" "}
                                {context?.userData?.last_name2}{" "}
                            </Heading>
                        </div>

                        <Tabs variant='line' colorScheme={"yellow"} mt={6}>
                        <TabList>
                            <Tab>Perfil</Tab>
                            <Tab>Direcciones</Tab>
                            <Tab>Metodos de pago</Tab>
                            <Tab>Historial de compra</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <EditProfile/>
                            </TabPanel>
                            <TabPanel>
                                <EditAddress/>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    </div>
                </Container>
            ) : (
                <div className="flex items-center justify-center w-full h-screen">
                    <Spinner size={"xl"} />
                </div>
            )}
        </div>
    );
};

export default Profile;
