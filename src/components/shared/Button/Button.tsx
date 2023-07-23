import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    color: string;
    onClick: MouseEventHandler<HTMLElement>; 
    disabled?: boolean;
}

// NOTE : typeMap, colorMap tailwind-config에 뺄 것
const typeMap : { [key: string] : string} = {
    button1: 'flex items-center rounded text-button1 px-10 py-3.5',
    button2: 'flex items-center rounded text-button2 px-2 py-1.5',
    button3 : 'flex justify-between items-center px-5 py-2',
    // NOTE : 그림자 효과가 있는 것 같은데 시안 상에서 자세히 확인되지 않으므로 물어보고 반영 예정
    button4 : 'flex justify-center items-center rounded-full w-[4.5rem] h-[4.5rem]'
}

const colorMap : { [key: string] : string} = {
    primary: 'bg-grayscale-700 text-white',
    secondary: 'bg-grayscale-200 text-primary',
    nudge: 'bg-nudge text-grayscale-500',
    link: 'bg-black text-white',
    rounded: 'bg-black text-white text-accent-eng',
    disabled: 'bg-grayscale-300 text-white'
}

const colorType : { [key: string] : string} = {
    primary : 'button1',
    secondary: 'button1',
    nudge: 'button2',
    link : 'button3',
    rounded: 'button4'
}

export function Button({
    children,
    color = 'primary',
    onClick,
    disabled,
    className,
    ...restProps
} : PropsWithChildren<Props>){
    const buttonType = typeMap[colorType[color]];
    const buttonColor = colorMap[color]; 
    
    return(
        <button 
            className={clsx(
                className,
                buttonType,
                { [buttonColor] : disabled ? false : true},
                { [colorMap.disabled] : disabled? true : false }            
                )} 
            onClick={onClick}
            disabled={disabled}
            {...restProps}>
            {children}
        </button>
    )
}