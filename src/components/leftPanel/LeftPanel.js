import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import logo from "./../../imgMFC/logo.svg";
import * as React from "react";
import PropTypes from "prop-types";
import "./leftPanel.scss";
import styled from "@emotion/styled";
import Report from "../../pages/Report/Report.js";
import Analytics from "../../pages/analytics/Analytics.js";
import Office from "../../pages/office/Office.js";
import {useState, useEffect} from "react";
// import UserService from "../../API/UserService";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const LeftPanel = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const DTabs = styled(Tab)(({index}) => ({
        color: "var(--blackContent)",
        bgcolor: "none",
        textTransform: "none",
        fontFamily: "PT Sans",
        fontSize: "16px",
        fontWeight: "400",
        height: "70px",
        backgroundColor: value === index ? "var(--white)" : "transparent",
        "&.Mui-selected": {
            color: "var(--blackContent)",
            backgroundColor: "var(--white)",
        },
        "&:hover": {
            backgroundColor: "var(--beigeOpacity10)", // Светло-серый фон при наведении
        },
    }));


    /*вывод ФИО пользователя********************************************************************************************** */
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // useEffect(() => {
    //     const sendResponse = async () => {
    //         try {
    //             const response = await UserService.getUser()
    //             setUser(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Ошибка ввода:", error);
    //         }
    //     };

    //     sendResponse();
    // }, []);

    // if (loading) {
    //     return <div>Загрузка...</div>;
    // }

    // if (error) {
    //     return <div>Ошибка: {error}</div>;
    // }

    // if (!user) {
    //     return <div>Пользователь не найден</div>;
    // }


    return (
        <div className="wrapper">
            <div className="container">
                {/* ограничивающий контейнер 1280px */}
                <div className="lp-container">
                    <div className="leftPanel tab-panel-scroll">
                        <img className="leftPanel-logo" src={logo} alt="logo"/>
                        <div className="line"></div>
                        <div className="user-info">
                            <p>{user.first_name}</p>
                            <p>{user.last_name}</p>
                            <p>{user.sur_name}</p>
                        </div>

                        <div className="tabs-group">
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                sx={{".MuiTabs-indicator": {display: "none"}}}
                            >
                                <DTabs
                                    index={0}
                                    label="Удмуртская республика"
                                    {...a11yProps(0)}
                                />
                                <DTabs index={1} label="Офис МФЦ" {...a11yProps(1)} />
                                <DTabs index={2} label="Аналитика" {...a11yProps(2)} />
                                <DTabs index={3} label="Отчет по сотрудникам" {...a11yProps(3)} />
                            </Tabs>
                        </div>
                        <div className="line bottom"></div>
                        <button className="logout-button">Выйти</button>
                    </div>
                    <div>
                        <Box
                            sx={{
                                flexGrow: 1,
                                bgcolor: "background.paper",
                                display: "flex",
                                padding: 0,
                                borderRadius: "0 28px 28px 0 ",
                            }}
                            className="tab-panel-scroll"
                        >
                            <TabPanel sx={{padding: 0}} value={value} index={0}>
                                <Report></Report>
                                {/* <AddEmployee></AddEmployee> */}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Office></Office>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Analytics></Analytics>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
