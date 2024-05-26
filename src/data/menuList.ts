import IconCalender from "../../public/Calender.Icon";
import IconDental from "../../public/Dental.Icon";
import IconPatients from "../../public/Patients.Icon";
import IconTask from "../../public/Service.Icon";
import IconSchedule from "../../public/Schedule.Icon";
import IconGear from "../../public/Gear.Icon";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

const getMenuList = (pathname: string): Group[] => {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/app/schedule",
          label: "Agenda",
          active: pathname.includes("/schedule"),
          icon: IconCalender,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Cadastros",
      menus: [
        {
          href: "/app/patient",
          label: "Paciente",
          active: pathname.includes("/app/patient"),
          icon: IconPatients,
          submenus: [
            {
              href: "/app/patient",
              label: "Listar Pacientes",
              active: pathname === "/app/patient",
            },
            {
              href: "/app/patient?interface=register",
              label: "Cadastrar Paciente",
              active: pathname === "/app/patient?interface=register",
            },
          ],
        },
        {
          href: "/app/odontogram",
          label: "Odontograma",
          active: pathname.includes("/app/odontogram"),
          icon: IconDental,
          submenus: [
            {
              href: "/app/odontogram",
              label: "Listar Odontogramas",
              active: pathname === "/app/odontogram",
            },
            {
              href: "/app/odontogram?interface=register",
              label: "Registrar Odontograma",
              active: pathname === "/app/odontogram?interface=register",
            },
          ],
        },
        {
          href: "/app/service",
          label: "Serviço",
          active: pathname.includes("/app/service"),
          icon: IconTask,
          submenus: [
            {
              href: "/app/service",
              label: "Listar Serviços",
              active: pathname === "/app/service",
            },
            {
              href: "/app/service?interface=register",
              label: "Cadastrar Serviço",
              active: pathname === "/app/service?interface=register",
            },
          ],
        },
        {
          href: "/app/schedule",
          label: "Agendamento",
          active: pathname.includes("/app/schedule"),
          icon: IconSchedule,
          submenus: [
            {
              href: "/app/schedule",
              label: "Listar Agendamentos",
              active: pathname === "/app/schedule",
            },
            {
              href: "/app/schedule?interface=register",
              label: "Agendar",
              active: pathname === "/app/schedule?interface=register",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/app/config",
          label: "Configurações",
          active: pathname.includes("/app/config"),
          icon: IconGear,
          submenus: [
            {
              href: "/app/config/clinic",
              label: "Registrar Clinica",
              active: pathname === "/app/config/clinic",
            },
          ],
        },
      ],
    },
  ];
};

export default getMenuList;
