import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import  ImagemSecretaria  from "../../../../src/assets/secretariaEscola.png";
import { useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IMenuLateralProps {
    children: React.ReactNode; 
}

interface IListItemLinkProps {
    to: string;
    label: string;
    icon: string;
    onClick: (() => void) | undefined;

}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick  }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false})

const handleClick = () => {
    onClick?.();
    navigate(to);
};

    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon color="primary">{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>

            
    );
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return(
        <>
             <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{ height: theme.spacing(15), width: theme.spacing(15)}} src={ImagemSecretaria}/> 
                    </Box>

                    <Divider />
                    
                    <Box flex={1}>
                        <List component="nav">
                            <ListItemLink to="/pagina-inicial" label="Dashboard" icon={"home"} onClick={smDown ? toggleDrawerOpen : undefined} />
                            <ListItemLink to="/alunos" label="Alunos" icon={"schoolIcon"} onClick={smDown ? toggleDrawerOpen : undefined} />
                            <ListItemLink to="/professores" label="Professores" icon={"peopleAltIcon"} onClick={smDown ? toggleDrawerOpen : undefined} /> 
                            <ListItemLink to="/turmas" label="Turmas" icon={"classIcon"} onClick={smDown ? toggleDrawerOpen : undefined} /> 
                            <ListItemLink to="meu-perfil" label="Meu perfil" icon={"engineeringIcon"} onClick={smDown ? toggleDrawerOpen : undefined} />    
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
       
    );
};