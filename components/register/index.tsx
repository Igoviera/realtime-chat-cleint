import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Text,
    Box
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
    .object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string().required('O e-mail é obrigatório'),
        cpf: yup.string().required('O CPF é obrigatório'),
        password: yup.string().required('A senha é obrigatória')
    })
    .required()
type FormData = yup.InferType<typeof schema>

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data: FormData) => console.log(data)

    return (
        <VStack spacing="5px">
            <Box w={'100%'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel>Name</FormLabel>
                    <Input {...register('name')} placeholder="Digite seu nome" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.name?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Email Address</FormLabel>
                    <Input {...register('email')} type="email" placeholder="Digite um e-mail" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.email?.message}
                    </Text>
                    <FormLabel mt={'20px'}>CPF</FormLabel>
                    <Input {...register('cpf')} placeholder="Digite seu CPF" />
                    <Text fontSize={'14px'} color={'red'}>
                        {errors.cpf?.message}
                    </Text>
                    <FormLabel mt={'20px'}>Password</FormLabel>         
                    <Input {...register('password')}  placeholder="Digite uma senha" />
                    <Text mb={5} fontSize={'14px'} color={'red'}>
                        {errors.password?.message}
                    </Text>
                    <Button
                        type="submit"
                        color={'white'}
                        transition={'0.5s'}
                        _hover={{ bg: '#0a5c70' }}
                        bg={'#169ec0'}
                        w={'100%'}
                    >
                        Cadastrar
                    </Button>
                </form>
            </Box>
        </VStack>
    )
}
