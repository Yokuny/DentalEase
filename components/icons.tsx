import * as React from "react";
import { IconSvgProps } from "@/types";

export const LogoImg: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => (
  <svg fill="none" height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.953,6.157A8.842,8.842,0,0,1,5.811,4.1a2.362,2.362,0,0,1,3-2.315.342.342,0,0,1-.178.661C6.4,1.916,6.271,4.482,6.626,6.032a.342.342,0,1,1-.673.125ZM22.589,3.951v14.6a1.256,1.256,0,0,1-1.255,1.255h-5.59v2.054h2.4a.342.342,0,0,1,0,.684H4.449a.342.342,0,1,1,0-.684h2.4V19.81H1.255A1.256,1.256,0,0,1,0,18.555V3.951A1.256,1.256,0,0,1,1.255,2.7H4.381C5.359-.594,9.126-.6,11.387,1.218,13.3-.376,17.109-.859,18.185,2.7h3.149A1.256,1.256,0,0,1,22.589,3.951ZM7.913,13.523a.319.319,0,0,0,.352.111.359.359,0,0,0,.253-.327C8.8,10.279,10.041,7.815,11.3,7.815s2.5,2.463,2.778,5.491a.361.361,0,0,0,.253.328.32.32,0,0,0,.352-.112,16.229,16.229,0,0,0,3.1-8.545c.226-4.26-3.12-5.341-5.819-3.326a9.363,9.363,0,0,1,.961.879c.307.322-.207.794-.5.465-.6-.72-4.334-3.917-6.668-1.384C3.313,4.531,6.1,11.353,7.913,13.523ZM15.06,19.81H7.53v2.054h7.53Zm6.845-2.738H.685v1.483a.57.57,0,0,0,.57.57H21.334a.571.571,0,0,0,.571-.57Zm0-13.121a.571.571,0,0,0-.571-.57H18.36a15.729,15.729,0,0,1-3.153,10.575,1,1,0,0,1-1.082.332,1.053,1.053,0,0,1-.734-.92C13.1,10.218,11.855,8.5,11.3,8.5S9.487,10.218,9.2,13.37a1.054,1.054,0,0,1-.734.919,1,1,0,0,1-1.082-.332A15.882,15.882,0,0,1,4.214,3.381H1.255a.57.57,0,0,0-.57.57V16.388h21.22Z"
    />
  </svg>
);

export const UpIcon: React.FC<IconSvgProps> = ({ size = 12, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
      />
    </svg>
  );
};

export const DownIcon: React.FC<IconSvgProps> = ({ size = 12, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
      />
    </svg>
  );
};

export const PlayIcon: React.FC<IconSvgProps> = ({ size = 14, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"
      />
    </svg>
  );
};

export const PauseIcon: React.FC<IconSvgProps> = ({ size = 14, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"
      />
    </svg>
  );
};

export const ClockIcon: React.FC<IconSvgProps> = ({ size = 18, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 470" width={size || width} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="38"
        d="M256 232v-80"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="78"
        d="M256 88V72M132 132l-12-12"
      />
      <circle
        cx="256"
        cy="272"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        d="M256 96a176 176 0 10176 176A176 176 0 00256 96z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="40"
      />
    </svg>
  );
};

export const ConfirmIcon: React.FC<IconSvgProps> = ({ size = 25, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 500" width={size || width} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M400 352l64-64-64-64"
      />
      <path
        d="M448 288H154c-58.76 0-106-49.33-106-108v-20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
};

export const UserIcon: React.FC<IconSvgProps> = ({ size = 19, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="40"
      />
      <path
        d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="46"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M88 176v112M144 232H32"
      />
    </svg>
  );
};

export const FileIcon: React.FC<IconSvgProps> = ({ size = 15, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 500" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z"
      />
    </svg>
  );
};

export const TrashIcon: React.FC<IconSvgProps> = ({ size = 19, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 500" width={size || width} {...props}>
      <path
        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="46"
        d="M80 112h352"
      />
      <path
        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176l8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="38"
      />
    </svg>
  );
};

export const PointIcon: React.FC<IconSvgProps> = ({ size = 17, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 16 16" width={size || width} {...props}>
      <path
        fill="currentColor"
        d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
      />
      <path
        fill="currentColor"
        d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
      />
    </svg>
  );
};

export const CalenderNumberIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <rect
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="38"
        d="M128 48v32M384 48v32M464 160H48M304 260l43.42-32H352v168M191.87 306.63c9.11 0 25.79-4.28 36.72-15.47a37.9 37.9 0 0011.13-27.26c0-26.12-22.59-39.9-47.89-39.9-21.4 0-33.52 11.61-37.85 18.93M149 374.16c4.88 8.27 19.71 25.84 43.88 25.84 28.59 0 52.12-15.94 52.12-43.82 0-12.62-3.66-24-11.58-32.07-12.36-12.64-31.25-17.48-41.55-17.48"
      />
    </svg>
  );
};

export const CalenderIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <rect
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
      />
      <circle fill="currentColor" cx="296" cy="232" r="24" />
      <circle fill="currentColor" cx="376" cy="232" r="24" />
      <circle fill="currentColor" cx="296" cy="312" r="24" />
      <circle fill="currentColor" cx="376" cy="312" r="24" />
      <circle fill="currentColor" cx="136" cy="312" r="24" />
      <circle fill="currentColor" cx="216" cy="312" r="24" />
      <circle fill="currentColor" cx="136" cy="392" r="24" />
      <circle fill="currentColor" cx="216" cy="392" r="24" />
      <circle fill="currentColor" cx="296" cy="392" r="24" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="52"
        strokeLinecap="round"
        d="M128 48v32M384 48v32"
      />
      <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M464 160H48" />
    </svg>
  );
};

export const WayIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 48 48" width={size || width} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M8.4464,7.6291v6.9622"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M39.5536,40.2045m0-14.2335V15.422h0A7.7768,7.7768,0,1,0,24,15.422V32.578a7.7768,7.7768,0,1,1-15.5536,0V28.8248"
      />
      <ellipse fill="currentColor" cx="8.4464" cy="21.7081" rx="3.9464" ry="3.9546" />
      <ellipse fill="currentColor" cx="39.5536" cy="26.0877" rx="3.9464" ry="3.9546" />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        clipRule="evenodd"
        fill="currentColor"
        fillRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      />
    </svg>
  );
};

export const TrackIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M256 96V56M256 456v-40"
      />
      <path
        d="M256 112a144 144 0 10144 144 144 144 0 00-144-144z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M416 256h40M56 256h40"
      />
    </svg>
  );
};

export const LocationIcon: React.FC<IconSvgProps> = ({ size = 24, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 512 512" width={size || width} {...props}>
      <path
        fill="currentColor"
        stroke="none"
        d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"
      />
    </svg>
  );
};

export const LogOutIcon: React.FC<IconSvgProps> = ({ size = 20, width, height, ...props }) => {
  return (
    <svg height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({ size = 22, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}>
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({ size = 22, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}>
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}>
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
  </svg>
);
