import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import LayersIcon from "@mui/icons-material/Layers";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// import LockIcon from "@mui/icons-material/Lock";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import AddchartIcon from "@mui/icons-material/Addchart";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export const SidebarData = [
  {
    title: "Agenda",
    path: "/",
    icon: <CalendarTodayIcon />,
  },
  {
    title: "Notificações",
    path: "/notification/",
    icon: <NotificationsNoneIcon />,
  },
  {
    title: "Contatos",
    path: "/contact-list/",
    icon: <PostAddIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Equipe",
        path: "/members-list/",
      },
    ],
  },
  {
    title: "Apps",
    path: "/chat/",
    icon: <LayersIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,

    subNav: [
      {
        title: "Chat",
        path: "/chat/",
      },
      {
        title: "Tarefas",
        path: "/task/",
      },
      {
        title: "Calendario",
        path: "/calendar/",
      },
    ],
  },
  {
    title: "Análise",
    path: "/analytics/",
    icon: <LineAxisIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Analytics",
        path: "/analytics/",
      },
      {
        title: "eCommerce",
        path: "/ecommerce/",
      },
      {
        title: "Project Management",
        path: "/project-management/",
      },
    ],
  },
  {
    title: "Transações",
    path: "/invoice/",
    icon: <ContentCopyIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Ultima transação",
        path: "/invoice-details/",
      },
    ],
  },
  {
    title: "Configurações",
    path: "/settings/account/",
    icon: <SettingsIcon />,
    iconClosed: <KeyboardArrowRightIcon />,
    iconOpened: <KeyboardArrowDownIcon />,
    subNav: [
      {
        title: "Conta",
        path: "/settings/account/",
      },
      {
        title: "Segurança",
        path: "/settings/security/",
      },
      {
        title: "Tema",
        path: "/settings/theme/",
      },
      {
        title: "Sair",
        path: "/authentication/logout/",
      },
    ],
  },
  // {
  //   title: "Authentication ROTAS UNICAS",
  //   path: "/",
  //   icon: <LockIcon />,
  //   iconClosed: <KeyboardArrowRightIcon />,
  //   iconOpened: <KeyboardArrowDownIcon />,

  //   subNav: [
  //     {
  //       title: "Sign Up",
  //       path: "/authentication/sign-up/",
  //     },
  //     {
  //       title: "Forgot Password",
  //       path: "/authentication/forgot-password/",
  //     },
  //     {
  //       title: "Lock Screen",
  //       path: "/authentication/lock-screen/",
  //     },
  //     {
  //       title: "Confirm Mail",
  //       path: "/authentication/confirm-mail/",
  //     },
  //     {
  //       title: "Logout",
  //       path: "/authentication/logout/",
  //     },
  //   ],
  // },
];
