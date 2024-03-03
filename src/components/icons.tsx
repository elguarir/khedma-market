import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideIcon,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

let mailIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.32807 8.17705L10.3281 2.81664C11.3147 2.06112 12.6854 2.06112 13.672 2.81664L20.672 8.17706C21.3515 8.69743 21.75 9.50453 21.75 10.3604V19C21.75 20.5188 20.5188 21.75 19 21.75H5C3.48122 21.75 2.25 20.5188 2.25 19V10.3604C2.25 9.50451 2.64853 8.69741 3.32807 8.17705ZM19.76 9.36797L12.76 4.00756C12.3116 3.66415 11.6885 3.66415 11.24 4.00756L4.24004 9.36798C3.93115 9.60451 3.75 9.97138 3.75 10.3604V19C3.75 19.6904 4.30964 20.25 5 20.25H19C19.6904 20.25 20.25 19.6904 20.25 19V10.3604C20.25 9.97136 20.0689 9.6045 19.76 9.36797Z"
      fill="currentColor"
    />
    <path
      d="M20.3578 8.91996C20.6867 8.66812 21.1575 8.73057 21.4093 9.05943C21.6382 9.3584 21.6074 9.77463 21.3529 10.037L21.2698 10.1109L13.6719 15.9291C12.7372 16.6449 11.4578 16.6826 10.4869 16.0422L10.328 15.9291L2.73161 10.112C2.40275 9.86016 2.3403 9.38941 2.59214 9.06055C2.82108 8.76158 3.23094 8.6828 3.55065 8.86015L3.64359 8.92108L11.24 14.7382C11.6511 15.053 12.2089 15.0793 12.6444 14.8169L12.76 14.7382L20.3578 8.91996Z"
      fill="currentColor"
    />
    <path
      d="M13.05 8.64998C13.3814 8.40145 13.8515 8.46861 14.1 8.79998C14.3259 9.10123 14.291 9.51713 14.0338 9.77698L13.95 9.84998L11.95 11.35C11.7129 11.5278 11.3969 11.5475 11.1423 11.4092L11.05 11.35L10.05 10.6C9.71861 10.3515 9.65145 9.88135 9.89998 9.54998C10.1259 9.24874 10.535 9.16585 10.8564 9.33999L10.95 9.39998L11.5 9.81298L13.05 8.64998Z"
      fill="currentColor"
    />
  </svg>
);

let inboxIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.382 14.25C7.99412 14.25 8.5577 14.5694 8.87383 15.0851L8.94759 15.2181L9.39391 16.1117C9.42778 16.1795 9.48996 16.2273 9.56197 16.2438L9.61753 16.25H14.3815C14.4572 16.25 14.5278 16.2158 14.5746 16.1587L14.6051 16.1118L15.0523 15.2174C15.3259 14.6701 15.8633 14.3089 16.4657 14.2566L16.6175 14.25H21C21.4142 14.25 21.75 14.5858 21.75 15C21.75 15.3797 21.4678 15.6935 21.1018 15.7432L21 15.75H16.6175C16.5418 15.75 16.4712 15.7842 16.4244 15.8413L16.3939 15.8882L15.9467 16.7826C15.6731 17.3299 15.1357 17.6911 14.5333 17.7434L14.3815 17.75H9.61753C9.00542 17.75 8.44185 17.4306 8.12573 16.9149L8.05197 16.7819L7.60565 15.8883C7.57179 15.8205 7.50959 15.7727 7.43757 15.7562L7.382 15.75H3C2.58579 15.75 2.25 15.4142 2.25 15C2.25 14.6203 2.53215 14.3065 2.89823 14.2568L3 14.25H7.382Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2.25H18C20.0711 2.25 21.75 3.92893 21.75 6V18C21.75 20.0711 20.0711 21.75 18 21.75H6C3.92893 21.75 2.25 20.0711 2.25 18V6C2.25 3.92893 3.92893 2.25 6 2.25ZM18 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V18C3.75 19.2426 4.75736 20.25 6 20.25H18C19.2426 20.25 20.25 19.2426 20.25 18V6C20.25 4.75736 19.2426 3.75 18 3.75Z"
      fill="currentColor"
    />
    <path
      d="M14.9697 9.46467C15.2359 9.1984 15.6526 9.17419 15.9462 9.39205L16.0303 9.46467C16.3011 9.73548 16.3257 10.1526 16.1079 10.4462L16.0353 10.5303C15.7645 10.8011 15.3474 10.8258 15.0538 10.6079L14.9697 10.5353C14.6988 10.2645 14.6742 9.84744 14.892 9.55379L14.9697 9.46467Z"
      fill="currentColor"
    />
    <path
      d="M11.4697 9.46467C11.7359 9.1984 12.1526 9.17419 12.4462 9.39205L12.5303 9.46467C12.8011 9.73548 12.8257 10.1526 12.6079 10.4462L12.5353 10.5303C12.2645 10.8011 11.8474 10.8258 11.5538 10.6079L11.4697 10.5353C11.1988 10.2645 11.1742 9.84744 11.392 9.55379L11.4697 9.46467Z"
      fill="currentColor"
    />
    <path
      d="M7.96965 9.46467C8.23592 9.1984 8.65258 9.17419 8.9462 9.39205L9.03031 9.46467C9.30113 9.73548 9.32575 10.1526 9.10793 10.4462L9.03531 10.5303C8.7645 10.8011 8.34743 10.8258 8.05378 10.6079L7.96965 10.5353C7.69884 10.2645 7.67422 9.84744 7.89204 9.55379L7.96965 9.46467Z"
      fill="currentColor"
    />
  </svg>
);

let logo = (props: LucideProps) => (
  <>
    <svg
      {...props}
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 811.35 385.01"
    >
      <g id="Logo">
        <g id="logo">
          <g>
            <path
              className="fill-current"
              d="m372.38,267.49c1.07-6.08,2.68-14.76,4.83-26.03,2.15-11.27,4.56-24.06,7.25-38.37,2.68-14.3,5.72-29.51,9.12-45.61,3.4-16.1,6.71-31.93,9.93-47.49,3.22-15.56,6.44-30.5,9.66-44.81,3.22-14.3,6.08-26.83,8.59-37.56,1.42-6.08,5.37-11.98,11.81-17.71,6.44-5.72,16.45-8.94,30.05-9.66,26.83-1.43,46.69,3.49,59.57,14.76,12.88,11.27,20.57,26.56,23.08,45.88l42.39,266.17c2.86,13.24,7.33,22.46,13.42,27.64,6.08,5.19,13.41,6.71,22,4.56,6.08-1.43,10.46-3.76,13.15-6.98,2.68-3.22,4.47-6.98,5.37-11.27.89-4.29,1.07-8.76.54-13.42-.54-4.64-1.16-8.76-1.88-12.34l-40.25-244.17c-1.07-8.94-.99-17.35.27-25.22,1.25-7.87,3.76-14.76,7.51-20.66,3.76-5.9,9.03-10.73,15.83-14.49,6.79-3.76,15.38-6.17,25.76-7.24,11.08-1.07,21.64-.89,31.66.54,10.01,1.43,19.05,4.39,27.1,8.85,8.05,4.48,14.84,10.65,20.39,18.51,5.54,7.87,9.57,17.53,12.08,28.98l69.76,323.59h-61.71l-66.01-315.01c-.36-2.86-1.07-6.79-2.15-11.81-1.07-5.01-2.87-9.93-5.37-14.76-2.51-4.83-5.9-9.03-10.2-12.61-4.29-3.57-10.02-5.37-17.17-5.37-10.73-.35-19.86,3.94-27.37,12.88-7.51,8.95-10.38,22.54-8.59,40.78l40.78,245.78c.71,6.8.89,13.42.54,19.86-.36,6.44-1.79,12.34-4.29,17.71-2.51,5.37-6.09,9.93-10.73,13.68-4.65,3.76-10.73,6.35-18.25,7.78-6.8,1.43-13.95,2.15-21.46,2.15-19.68,0-35.69-6.53-48.03-19.59-12.34-13.06-21.73-34.08-28.17-63.05l-40.78-253.83c-.36-2.15-1.07-4.83-2.15-8.05-1.07-3.22-2.51-6.26-4.29-9.12-1.79-2.86-4.12-5.37-6.98-7.51-2.87-2.15-6.26-3.4-10.2-3.76-7.16-1.07-13.42.81-18.78,5.63-5.37,4.83-8.95,11.36-10.73,19.59-2.87,14.67-5.64,29.16-8.32,43.47-2.68,14.31-5.1,27.64-7.25,39.98-2.15,12.34-4.12,23.53-5.9,33.54-1.79,10.02-3.22,18.07-4.29,24.15-2.15,13.6-2.77,26.83-1.88,39.71.89,12.88,2.86,25.22,5.9,37.03,3.04,11.81,6.88,22.99,11.54,33.54,4.64,10.56,9.66,20.31,15.02,29.25,12.16,20.75,26.65,40.07,43.47,57.96h-94.99c-5.01-10.37-9.04-25.93-12.07-46.69-3.04-20.74-2.41-44,1.88-69.76Z"
            />
            <path
              className="fill-current"
              d="m51.52,6.14v184.6L244.71,6.68l16.64-.54L105.18,155.33c17.53,6.44,32.28,14.22,44.27,23.34,11.98,9.12,22.09,18.7,30.32,28.71,8.22,10.02,15.02,20.12,20.39,30.32,5.37,10.2,10.01,19.77,13.95,28.71,9.3,20.04,20.66,38.91,34.08,56.62,13.42,17.71,29.42,32.83,48.03,45.35l20.39,15.03-116.45.54c-3.22-6.44-5.9-15.38-8.05-26.83-2.15-11.45-4.48-24.23-6.98-38.37-2.51-14.13-5.64-28.89-9.39-44.27-3.76-15.38-8.85-30.14-15.29-44.27-6.44-14.13-14.85-27.1-25.22-38.91-10.38-11.81-23.26-21.11-38.64-27.91l-45.08,43.47v177.09H0V6.14h51.52Z"
            />
          </g>
        </g>
      </g>
    </svg>
  </>
);

let workIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 6.25H19C20.5188 6.25 21.75 7.48122 21.75 9V17C21.75 19.6234 19.6234 21.75 17 21.75H7C4.46484 21.75 2.3798 19.7592 2.25512 17.218L2.25 17V9C2.25 7.48122 3.48122 6.25 5 6.25ZM19 7.75H5C4.30964 7.75 3.75 8.30964 3.75 9L3.74977 16.9816L3.75399 17.1628C3.83877 18.8877 5.26559 20.25 7 20.25H17C18.7949 20.25 20.25 18.7949 20.25 17V9C20.25 8.30964 19.6904 7.75 19 7.75Z"
      fill="currentColor"
    />
    <path
      d="M14 2.25C15.4625 2.25 16.6584 3.3917 16.745 4.83248L16.75 5V7C16.75 7.41421 16.4142 7.75 16 7.75C15.6203 7.75 15.3065 7.46785 15.2568 7.10177L15.25 7V5C15.25 4.35279 14.7581 3.82047 14.1278 3.75645L14 3.75H10C9.35279 3.75 8.82047 4.24187 8.75645 4.87219L8.75 5V7C8.75 7.41421 8.41421 7.75 8 7.75C7.6203 7.75 7.30651 7.46785 7.25685 7.10177L7.25 7V5C7.25 3.53747 8.3917 2.3416 9.83248 2.25502L10 2.25H14Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2761 10.25H13.7239C14.2906 10.25 14.75 10.7094 14.75 11.2761V13.7239C14.75 14.2906 14.2906 14.75 13.7239 14.75H10.2761C9.70942 14.75 9.25 14.2906 9.25 13.7239V11.2761C9.25 10.7094 9.70942 10.25 10.2761 10.25ZM13.25 13.249V11.749H10.75V13.249H13.25Z"
      fill="currentColor"
    />
    <path
      d="M21 8.25C21.4142 8.25 21.75 8.58579 21.75 9C21.75 11.2782 19.9575 13.1377 17.7059 13.2451L17.5 13.25H14C13.5858 13.25 13.25 12.9142 13.25 12.5C13.25 12.1203 13.5322 11.8065 13.8982 11.7568L14 11.75H17.5C19.0188 11.75 20.25 10.5188 20.25 9C20.25 8.58579 20.5858 8.25 21 8.25Z"
      fill="currentColor"
    />
    <path
      d="M3 8.25C3.41421 8.25 3.75 8.58579 3.75 9C3.75 10.4625 4.8917 11.6584 6.33248 11.745L6.5 11.75H10C10.4142 11.75 10.75 12.0858 10.75 12.5C10.75 12.8797 10.4678 13.1935 10.1018 13.2432L10 13.25H6.5C4.15279 13.25 2.25 11.3472 2.25 9C2.25 8.58579 2.58579 8.25 3 8.25Z"
      fill="currentColor"
    />
  </svg>
);

let earningsIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5.25C12.3797 5.25 12.6935 5.53215 12.7432 5.89823L12.75 6V7.5C12.75 7.91421 12.4142 8.25 12 8.25C11.6203 8.25 11.3065 7.96785 11.2568 7.60177L11.25 7.5V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.8943 5.10571C15.0867 1.2981 8.91338 1.2981 5.10577 5.10571C1.29816 8.9133 1.29816 15.0867 5.10577 18.8943C8.91336 22.7019 15.0867 22.7019 18.8943 18.8943C22.7019 15.0867 22.7019 8.91332 18.8943 5.10571ZM6.16643 6.16637C9.32114 3.01166 14.3951 2.94594 17.6297 5.9692L17.8337 6.16637L18.0308 6.3703C21.0541 9.60498 20.9884 14.6789 17.8337 17.8336C14.6118 21.0554 9.38824 21.0554 6.16643 17.8336C2.9446 14.6118 2.9446 9.38818 6.16643 6.16637Z"
      fill="currentColor"
    />
    <path
      d="M12 15.75C12.3797 15.75 12.6935 16.0322 12.7432 16.3982L12.75 16.5V18C12.75 18.4142 12.4142 18.75 12 18.75C11.6203 18.75 11.3065 18.4678 11.2568 18.1018L11.25 18V16.5C11.25 16.0858 11.5858 15.75 12 15.75Z"
      fill="currentColor"
    />
    <path
      d="M12.75 6.75C14.4072 6.75 15.75 8.09279 15.75 9.75C15.75 10.1642 15.4142 10.5 15 10.5C14.5858 10.5 14.25 10.1642 14.25 9.75C14.25 8.96997 13.6554 8.32951 12.8945 8.25686L12.75 8.25H11.107C10.3572 8.25 9.75 8.85721 9.75 9.607C9.75 10.1846 10.1147 10.6933 10.6499 10.8842L10.7764 10.9225L13.5884 11.6275C14.8591 11.9462 15.75 13.0881 15.75 14.398C15.75 15.9196 14.5603 17.1633 13.0608 17.2502L12.893 17.255H11.25C9.59279 17.255 8.25 15.9122 8.25 14.255C8.25 13.8408 8.58579 13.505 9 13.505C9.3797 13.505 9.69349 13.7872 9.74315 14.1532L9.75 14.255C9.75 15.035 10.3446 15.6755 11.1055 15.7481L11.25 15.755H12.893C13.6422 15.755 14.25 15.1474 14.25 14.398C14.25 13.8204 13.8853 13.3117 13.3501 13.1208L13.2236 13.0825L10.4116 12.3775C9.14093 12.0588 8.25 10.9169 8.25 9.607C8.25 8.08515 9.43908 6.84172 10.9391 6.75485L11.107 6.75H12.75Z"
      fill="currentColor"
    />
  </svg>
);

let SettingsIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2 2.25H12.8C13.5384 2.25 14.1973 2.71357 14.4469 3.40858L14.9541 4.82147C14.9746 4.87809 15.0145 4.92567 15.066 4.95547L16.5728 5.82537C16.624 5.85489 16.6839 5.86534 16.7418 5.85491L18.2208 5.5881C18.9481 5.45585 19.68 5.79486 20.0488 6.43385L20.8487 7.81358C21.2192 8.45208 21.1492 9.25441 20.6726 9.82034L19.7012 10.9688C19.663 11.0139 19.642 11.0712 19.642 11.13V12.8697C19.642 12.9288 19.663 12.9861 19.7016 13.0316L20.6736 14.1809C21.1491 14.7456 21.2191 15.5479 20.8488 16.1861L20.0494 17.565C19.6802 18.2045 18.9492 18.5434 18.2228 18.412L16.743 18.1451C16.6849 18.1346 16.6249 18.1451 16.5739 18.1745L15.0675 19.0441C15.0154 19.0743 14.9756 19.1219 14.9558 19.1764L14.4478 20.5914C14.1981 21.2869 13.5384 21.7506 12.8 21.75H11.2C10.4616 21.75 9.80269 21.2864 9.55309 20.5914L9.04593 19.1787C9.02524 19.1217 8.98517 19.0737 8.93519 19.0446L7.42716 18.1746C7.376 18.1451 7.31604 18.1347 7.25813 18.1451L5.77915 18.4119C5.05186 18.5441 4.31991 18.2051 3.95112 17.5661L3.15128 16.1864C2.78078 15.5479 2.85079 14.7456 3.32734 14.1797L4.29873 13.0312C4.33696 12.9861 4.35795 12.9288 4.35798 12.87V11.1303C4.35796 11.0712 4.33697 11.0139 4.29591 10.9655L3.33628 9.81908C2.86079 9.25441 2.79078 8.45208 3.16112 7.81385L3.96047 6.43498C4.32975 5.79543 5.06076 5.45653 5.78713 5.58792L7.26691 5.85488C7.32504 5.86535 7.385 5.85489 7.43618 5.82536L8.94173 4.95679C8.99417 4.92626 9.03424 4.8783 9.05409 4.82358L9.56211 3.40853C9.80969 2.71904 10.4605 2.25674 11.2 2.25ZM12.8 3.75L11.2068 3.74997C11.1022 3.75093 11.0092 3.81697 10.9739 3.91542L10.465 5.33275C10.3245 5.72016 10.0524 6.04593 9.69377 6.25464L8.18579 7.12463C7.82767 7.33125 7.40795 7.40441 7.00082 7.33109L5.52048 7.06402C5.41667 7.04525 5.31224 7.09366 5.25883 7.18615L4.45868 8.56642C4.40575 8.65763 4.41575 8.77225 4.48507 8.85458L5.44329 9.99927C5.7109 10.3152 5.85783 10.7158 5.85798 11.1301L5.85798 12.8703C5.85781 13.2843 5.71086 13.6849 5.44361 14.0003L4.47368 15.1471C4.40575 15.2278 4.39575 15.3424 4.44883 15.4339L5.24955 16.8151C5.30234 16.9066 5.4069 16.955 5.51182 16.9359L6.99204 16.6689C7.39896 16.5956 7.81867 16.6687 8.17677 16.8754L9.68723 17.7468C10.0434 17.9541 10.3155 18.2798 10.4569 18.6696L10.9648 20.0845C11.0005 20.1838 11.0946 20.25 11.2 20.25H12.8006C12.9061 20.2501 13.0004 20.1838 13.0361 20.0845L13.5448 18.6674C13.6856 18.279 13.9588 17.9527 14.317 17.7454L15.8241 16.8753C16.1823 16.6687 16.602 16.5956 17.0091 16.6689L18.4894 16.9359C18.5933 16.9547 18.6977 16.9063 18.7511 16.8138L19.5512 15.4335C19.6042 15.3423 19.5942 15.2277 19.5273 15.1483L18.5567 14.0007C18.2891 13.6848 18.1421 13.2842 18.142 12.8699V11.1297C18.1421 10.7157 18.2891 10.3151 18.5563 9.99966L19.5263 8.85292C19.5942 8.77225 19.6042 8.65763 19.5511 8.56615L18.7504 7.1849C18.6976 7.09344 18.593 7.04501 18.4881 7.06409L17.0079 7.33113C16.601 7.40441 16.1813 7.33125 15.823 7.12453L14.3154 6.25417C13.9578 6.04728 13.6846 5.72094 13.5431 5.33042L13.0351 3.9155C12.9995 3.81621 12.9054 3.75 12.8 3.75Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12ZM14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
      fill="currentColor"
    />
  </svg>
);

let dashboardIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 2.25H7.75C9.26921 2.25 10.5 3.48079 10.5 5V10C10.5 11.5192 9.26921 12.75 7.75 12.75H5C3.48079 12.75 2.25 11.5192 2.25 10V5C2.25 3.48079 3.48079 2.25 5 2.25ZM7.75 3.75H5C4.30921 3.75 3.75 4.30921 3.75 5V10C3.75 10.6908 4.30921 11.25 5 11.25H7.75C8.44079 11.25 9 10.6908 9 10V5C9 4.30921 8.44079 3.75 7.75 3.75Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 15.75H7.75C9.26921 15.75 10.5 16.9808 10.5 18.5V19C10.5 20.5192 9.26921 21.75 7.75 21.75H5C3.48079 21.75 2.25 20.5192 2.25 19V18.5C2.25 16.9808 3.48079 15.75 5 15.75ZM7.75 17.25H5C4.30921 17.25 3.75 17.8092 3.75 18.5V19C3.75 19.6908 4.30921 20.25 5 20.25H7.75C8.44079 20.25 9 19.6908 9 19V18.5C9 17.8092 8.44079 17.25 7.75 17.25Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.25 11.25H19C20.5192 11.25 21.75 12.4808 21.75 14V19C21.75 20.5192 20.5192 21.75 19 21.75H16.25C14.7308 21.75 13.5 20.5192 13.5 19V14C13.5 12.4808 14.7308 11.25 16.25 11.25ZM19 12.75H16.25C15.5592 12.75 15 13.3092 15 14V19C15 19.6908 15.5592 20.25 16.25 20.25H19C19.6908 20.25 20.25 19.6908 20.25 19V14C20.25 13.3092 19.6908 12.75 19 12.75Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.25 2.25H19C20.5192 2.25 21.75 3.48079 21.75 5V5.5C21.75 7.01921 20.5192 8.25 19 8.25H16.25C14.7308 8.25 13.5 7.01921 13.5 5.5V5C13.5 3.48079 14.7308 2.25 16.25 2.25ZM19 3.75H16.25C15.5592 3.75 15 4.30921 15 5V5.5C15 6.19079 15.5592 6.75 16.25 6.75H19C19.6908 6.75 20.25 6.19079 20.25 5.5V5C20.25 4.30921 19.6908 3.75 19 3.75Z"
      fill="currentColor"
    />
  </svg>
);

let uploadIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.25006C15.9435 2.25006 19.4987 4.62557 21.0078 8.2689C22.5169 11.9122 21.6828 16.1059 18.8943 18.8944C18.6014 19.1872 18.1265 19.1872 17.8336 18.8944C17.5407 18.6015 17.5407 18.1266 17.8336 17.8337C20.1931 15.4742 20.8989 11.9257 19.622 8.84292C18.345 5.76011 15.3368 3.75006 12 3.75006C8.66317 3.75006 5.65492 5.76011 4.37797 8.84292C3.10103 11.9257 3.80687 15.4742 6.16635 17.8337C6.45924 18.1266 6.45924 18.6015 6.16635 18.8944C5.87346 19.1872 5.39858 19.1872 5.10569 18.8944C2.31721 16.1059 1.48304 11.9122 2.99215 8.2689C4.50127 4.62557 8.05647 2.25006 12 2.25006Z"
      fill="currentColor"
    />
    <path
      d="M12 10.25C12.3797 10.25 12.6935 10.5322 12.7432 10.8982L12.75 11V20C12.75 20.4142 12.4142 20.75 12 20.75C11.6203 20.75 11.3065 20.4678 11.2568 20.1018L11.25 20V11C11.25 10.5858 11.5858 10.25 12 10.25Z"
      fill="currentColor"
    />
    <path
      d="M11.4697 10.4697C11.7359 10.2034 12.1526 10.1792 12.4462 10.3971L12.5303 10.4697L15.5303 13.4697C15.8232 13.7626 15.8232 14.2374 15.5303 14.5303C15.2641 14.7966 14.8474 14.8208 14.5538 14.6029L14.4697 14.5303L12 12.061L9.53033 14.5303C9.26406 14.7966 8.8474 14.8208 8.55379 14.6029L8.46967 14.5303C8.2034 14.2641 8.1792 13.8474 8.39705 13.5538L8.46967 13.4697L11.4697 10.4697Z"
      fill="currentColor"
    />
  </svg>
);

let resumeIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.278 9.79712C15.39 9.39835 15.8041 9.16592 16.2029 9.27797C16.5684 9.38069 16.7942 9.73721 16.743 10.1031L16.722 10.2029L15.598 14.2029C15.5172 14.4905 15.2751 14.6991 14.9863 14.7419L14.876 14.75H14.125C13.8263 14.75 13.5601 14.5734 13.4407 14.307L13.403 14.2031L12.278 10.2031C12.1659 9.80432 12.3982 9.39017 12.7969 9.27802C13.1625 9.17522 13.5409 9.36188 13.6879 9.70083L13.722 9.79695L14.499 12.564L15.278 9.79712Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.7614 2.25H18.2386C20.1779 2.25 21.75 3.82211 21.75 5.7614V18.2386C21.75 20.1779 20.1779 21.75 18.2386 21.75H5.7614C3.82211 21.75 2.25 20.1779 2.25 18.2386V5.7614C2.25 3.82211 3.82211 2.25 5.7614 2.25ZM18.2386 3.75H5.7614C4.65053 3.75 3.75 4.65053 3.75 5.7614V18.2386C3.75 19.3495 4.65053 20.25 5.7614 20.25H18.2386C19.3495 20.25 20.25 19.3495 20.25 18.2386V5.7614C20.25 4.65053 19.3495 3.75 18.2386 3.75Z"
      fill="currentColor"
    />
    <path
      d="M10.283 9.25C10.6972 9.25 11.033 9.58579 11.033 10C11.033 10.3797 10.7508 10.6935 10.3848 10.7432L10.283 10.75H9C8.88165 10.75 8.78251 10.8322 8.7566 10.9427L8.75 11V13C8.75 13.1183 8.83223 13.2175 8.94268 13.2434L9 13.25H10.283C10.6972 13.25 11.033 13.5858 11.033 14C11.033 14.3797 10.7508 14.6935 10.3848 14.7432L10.283 14.75H9C8.08183 14.75 7.32881 14.0429 7.2558 13.1435L7.25 13V11C7.25 10.0818 7.95711 9.32881 8.85647 9.2558L9 9.25H10.283Z"
      fill="currentColor"
    />
  </svg>
);

let downloadIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.25C12.3797 2.25 12.6935 2.53215 12.7432 2.89823L12.75 3V17C12.75 17.4142 12.4142 17.75 12 17.75C11.6203 17.75 11.3065 17.4678 11.2568 17.1018L11.25 17V3C11.25 2.58579 11.5858 2.25 12 2.25Z"
      fill="currentColor"
    />
    <path
      d="M8.46967 13.4697C8.73594 13.2034 9.1526 13.1792 9.44621 13.3971L9.53033 13.4697L12 15.939L14.4697 13.4697C14.7359 13.2034 15.1526 13.1792 15.4462 13.3971L15.5303 13.4697C15.7966 13.7359 15.8208 14.1526 15.6029 14.4462L15.5303 14.5303L12.5303 17.5303C12.2641 17.7966 11.8474 17.8208 11.5538 17.6029L11.4697 17.5303L8.46967 14.5303C8.17678 14.2374 8.17678 13.7626 8.46967 13.4697Z"
      fill="currentColor"
    />
    <path
      d="M8 9.25C8.41421 9.25 8.75 9.58579 8.75 10C8.75 10.3797 8.46785 10.6935 8.10177 10.7432L8 10.75H5C4.35239 10.75 3.82042 11.2415 3.75645 11.8721L3.75 12V19C3.75 19.6476 4.2415 20.1796 4.87212 20.2436L5 20.25H19C19.6476 20.25 20.1796 19.7585 20.2436 19.1279L20.25 19V12C20.25 11.3524 19.7585 10.8204 19.1279 10.7564L19 10.75H16C15.5858 10.75 15.25 10.4142 15.25 10C15.25 9.6203 15.5322 9.30651 15.8982 9.25685L16 9.25H19C20.4629 9.25 21.6584 10.3913 21.745 11.8324L21.75 12V19C21.75 20.4629 20.6087 21.6584 19.1676 21.745L19 21.75H5C3.53705 21.75 2.34157 20.6087 2.25502 19.1676L2.25 19V12C2.25 10.5371 3.39131 9.34157 4.83243 9.25502L5 9.25H8Z"
      fill="currentColor"
    />
  </svg>
);

let Location = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7515 2.2807L12 2.27661C16.1955 2.27661 19.5964 5.67749 19.5964 9.87301V10.045C19.5964 12.4836 17.8557 15.5764 15.2701 18.8054L14.7233 19.4752C14.5373 19.699 14.3475 19.9233 14.1543 20.1479L13.5646 20.8224L13.2626 21.1601C12.5863 21.9112 11.4138 21.9112 10.7376 21.1602C7.08608 17.1076 4.40363 13.0722 4.40363 10.045V9.87301C4.40363 5.7747 7.6543 2.419 11.7515 2.2807ZM12.005 3.72301L11.7882 3.72698C8.4821 3.83867 5.85043 6.55537 5.85043 9.87301V10.045C5.85043 11.7899 7.09375 14.1935 8.98686 16.7572L9.45338 17.3754C10.171 18.3064 10.9666 19.253 11.8126 20.1919C11.9143 20.3048 12.0858 20.3048 12.1876 20.1918C12.2816 20.0875 12.375 19.983 12.4677 19.8786L13.0158 19.2512C13.5553 18.6236 14.0684 17.996 14.5467 17.3753L15.0132 16.7572C16.9063 14.1935 18.1496 11.7899 18.1496 10.045V9.87301C18.1496 6.47653 15.3965 3.72341 12.005 3.72301Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7184 9.75203C14.6327 8.32484 13.4488 7.19458 12 7.19458L11.8341 7.19955C10.4069 7.28526 9.27661 8.46918 9.27661 9.91798L9.28158 10.1209C9.36729 11.5481 10.5512 12.6784 12 12.6784C13.5045 12.6784 14.7234 11.4595 14.7234 9.95498L14.7184 9.75203ZM10.73 9.78738C10.7953 9.14334 11.3386 8.64138 12 8.64138C12.7055 8.64138 13.2766 9.2125 13.2766 9.91798L13.27 10.0856C13.2047 10.7296 12.6614 11.2316 12 11.2316L11.8694 11.225C11.2254 11.1597 10.7234 10.6164 10.7234 9.95498L10.722 9.93598L10.73 9.78738Z"
      fill="currentColor"
    />
  </svg>
);

let user = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0052 3.9948C13.3455 2.33507 10.6545 2.33507 8.9948 3.9948C7.33507 5.65453 7.33507 8.34548 8.9948 10.0052C10.6545 11.6649 13.3455 11.6649 15.0052 10.0052C16.6649 8.34548 16.6649 5.65453 15.0052 3.9948ZM10.0555 5.05546C11.0847 4.02626 12.7267 3.98338 13.8069 4.92681L13.9445 5.05546L14.0732 5.19308C15.0166 6.27335 14.9737 7.91535 13.9445 8.94455C12.8706 10.0185 11.1294 10.0185 10.0555 8.94455C8.98151 7.8706 8.98151 6.12941 10.0555 5.05546Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 18.5C3.25 15.1186 7.30494 12.758 12 12.758C16.6951 12.758 20.75 15.1186 20.75 18.5V19.5C20.75 20.4662 19.9662 21.25 19 21.25H5C4.03379 21.25 3.25 20.4662 3.25 19.5V18.5ZM19.25 18.5C19.25 16.1641 15.9759 14.258 12 14.258C8.02413 14.258 4.75 16.1641 4.75 18.5V19.5C4.75 19.6378 4.86221 19.75 5 19.75H19C19.1378 19.75 19.25 19.6378 19.25 19.5V18.5Z"
      fill="currentColor"
    />
  </svg>
);

let trash = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.24998 5.625H18.75C19.1869 5.625 19.5313 5.99693 19.4978 6.43252L18.5326 18.9801C18.4123 20.5431 17.109 21.75 15.5414 21.75H8.45855C6.89095 21.75 5.58762 20.5431 5.46739 18.9801L4.50219 6.43252C4.46869 5.99693 4.8131 5.625 5.24998 5.625ZM17.94 7.125H6.05898L6.96297 18.865C7.01955 19.6006 7.60013 20.1784 8.3217 20.2438L8.45855 20.25H15.5414C16.3252 20.25 16.9769 19.6465 17.037 18.865L17.94 7.125Z"
      fill="currentColor"
    />
    <path
      d="M20 5.625C20.4142 5.625 20.75 5.96079 20.75 6.375C20.75 6.7547 20.4678 7.06849 20.1018 7.11815L20 7.125H4C3.58579 7.125 3.25 6.78921 3.25 6.375C3.25 5.9953 3.53215 5.68151 3.89823 5.63185L4 5.625H20Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.1875 2.25H14.8125C15.848 2.25 16.6875 3.08947 16.6875 4.125V6.375C16.6875 6.78921 16.3517 7.125 15.9375 7.125H8.0625C7.64829 7.125 7.3125 6.78921 7.3125 6.375V4.125C7.3125 3.08947 8.15197 2.25 9.1875 2.25ZM14.8881 3.75762L14.8125 3.75H9.1875C8.98039 3.75 8.8125 3.91789 8.8125 4.125L8.81201 5.625H15.187L15.1875 4.125C15.1875 3.94378 15.059 3.79259 14.8881 3.75762Z"
      fill="currentColor"
    />
    <path
      d="M9.94103 11.6581C10.1921 11.3775 10.6068 11.3301 10.912 11.5313L11.0001 11.5992L14.0001 14.2829C14.3088 14.5591 14.3351 15.0332 14.059 15.342C13.8079 15.6226 13.3932 15.6699 13.088 15.4687L13 15.4009L9.99996 12.7171C9.69125 12.441 9.66486 11.9668 9.94103 11.6581Z"
      fill="currentColor"
    />
    <path
      d="M12.7829 11.5C13.0591 11.1912 13.5332 11.1649 13.842 11.441C14.1226 11.6921 14.1699 12.1068 13.9687 12.412L13.9009 12.5001L11.2171 15.5001C10.941 15.8088 10.4668 15.8351 10.1581 15.559C9.87745 15.3079 9.83014 14.8932 10.0313 14.588L10.0992 14.5L12.7829 11.5Z"
      fill="currentColor"
    />
  </svg>
);

let editIcon = (props: LucideProps) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.76267 15.0887L15.0887 4.76266C15.7716 4.07976 16.8794 4.07976 17.5623 4.76266L19.2383 6.43866C19.9212 7.12155 19.9212 8.22943 19.2383 8.91237L8.91274 19.2359C8.58504 19.5654 8.1397 19.75 7.675 19.75H5C4.58579 19.75 4.25 19.4142 4.25 19V16.325C4.25 15.8603 4.43463 15.4149 4.76267 15.0887ZM18.1777 7.49932L16.5017 5.82332C16.4046 5.72621 16.2464 5.72621 16.1493 5.82332L5.82191 16.1507C5.77589 16.1965 5.75 16.259 5.75 16.325L5.749 18.25H7.675C7.71902 18.25 7.76145 18.2385 7.79884 18.2167L7.85072 18.1766L18.1777 7.85166C18.2748 7.75455 18.2748 7.59643 18.1777 7.49932Z"
      fill="currentColor"
    />
    <path
      d="M13.2197 6.62964C13.4859 6.36338 13.9026 6.33917 14.1962 6.55702L14.2803 6.62964L17.3703 9.71964C17.6632 10.0125 17.6632 10.4874 17.3703 10.7803C17.1041 11.0466 16.6874 11.0708 16.3938 10.8529L16.3097 10.7803L13.2197 7.6903C12.9268 7.39741 12.9268 6.92254 13.2197 6.62964Z"
      fill="currentColor"
    />
  </svg>
);
export const Icons = {
  logo,
  downloadIcon,
  editIcon,
  trash,
  Location,
  user,
  inboxIcon,
  workIcon,
  resumeIcon,
  SettingsIcon,
  uploadIcon,
  earningsIcon,
  dashboardIcon,
  close: X,
  mailIcon,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
};
