import {useForm} from 'react-hook-form';

const SignUpForm=()=>{

    const {register,handleSubmit,reset,formState:{errors}}=useForm();
    

    const handleClearSubmit=()=>{
        reset();

    }
    const handleFormSubmit=(data)=>{
        /*console.log(data);   */    
     
    }

    return (<>

    <form onSubmit={handleSubmit(handleFormSubmit)} >
        <label htmlFor="SignUpForm__name">Nombre</label>
        <input id='SignUpForm__name' {...register('name',{required:true})} /><br/>
        <label htmlFor="SignUpForm__age">Edad</label>
        <input id="SignUpForm__age" {...register('age',{required:true})} /><br/>
        <label htmlFor="SignUpForm__address">Dirección</label>
        <input id="SignUpForm__address" {...register('address',{required:true})} /><br/>
        <label htmlFor="SignUpForm__zip">Zip Code</label>
        <input id="SignUpForm__zip" {...register('zip',{required:true})} /><br/>
        <label htmlFor="SignUpForm__phone">Teléfono</label>
        <input id="SignUpForm__phone" {...register('phone',{required:true})} />
        <div>
            <button type='button' onClick={handleClearSubmit}>Limpiar</button>
            <button type='submit'>Submit</button>
        </div>


    </form>

    </>);
}


export default SignUpForm;