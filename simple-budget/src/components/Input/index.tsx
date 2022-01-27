import {FormLabel, InputGroup, InputLeftElement, Text, Input, FormErrorMessage} from "@chakra-ui/react"
import {theme} from "../../styles/theme"
import {FieldError} from "react-hook-form"
import {IconType} from "react-icons/lib"

interface InputProps {
    name: string
    type?: string
    placeholder?: string
    label?: string
    error?: FieldError | null
    icon?: IconType
    register: (user: any) => void
}

export const InputForm = ({name, type, placeholder, label, error = null, icon: Icon, register, ...rest}: InputProps) => {
    return (
        <>
            <FormLabel htmlFor={name} fontSize="18px">
                {label}
            </FormLabel>
            <InputGroup flexDirection="column">
                {
                    Icon && 
                        <InputLeftElement mt="2.5"
                            children={
                                <Icon size={18} color={theme.colors.purple["500"]}/>
                            }
                        />
                }
                <Input
                    border="2px solid"
                    borderColor="purple.500"
                    background="black.500"
                    color="white"
                    height="60px"
                    fontSize="lg"
                    type={type}
                    {...register(name)}
                    {...rest}
                />
                <Text marginBottom="12px" color="red" fontSize="md">
                    {error?.message}
                </Text>
            </InputGroup>
        </>
    )
}