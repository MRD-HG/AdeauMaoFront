import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { useUpdateProfile } from '../hooks/useUser';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ProfileForm = ({ user, onSubmit, isLoading }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: user
    });

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={`${user.prenom} ${user.nom}`} />
                    <AvatarFallback className="text-2xl">{user.prenom?.[0]}{user.nom?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-semibold">{user.prenom} {user.nom}</h3>
                    <p className="text-muted-foreground">{user.role}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Prénom</Label><Input {...register('prenom')} /></div>
                <div className="space-y-2"><Label>Nom</Label><Input {...register('nom')} /></div>
                <div className="space-y-2"><Label>E-mail</Label><Input type="email" {...register('email')} /></div>
                <div className="space-y-2"><Label>Téléphone</Label><Input {...register('telephone')} /></div>
                <div className="md:col-span-2 space-y-2"><Label>Adresse</Label><Input {...register('adresse')} /></div>
                <div className="space-y-2"><Label>Ville</Label><Input {...register('ville')} /></div>
                <div className="space-y-2"><Label>Pays</Label><Input {...register('pays')} /></div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Changer le mot de passe</CardTitle>
                    <CardDescription>Laissez vide si vous ne souhaitez pas le changer.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2"><Label>Nouveau mot de passe</Label><Input type="password" /></div>
                     <div className="space-y-2"><Label>Confirmer le mot de passe</Label><Input type="password" /></div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enregistrer les modifications
                </Button>
            </div>
        </form>
    );
};


const ProfilePage = () => {
    const { user } = useAuth();
    const updateProfileMutation = useUpdateProfile();

    const handleProfileSubmit = (data) => {
        updateProfileMutation.mutate({ userId: user.id, data });
    };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold">Mon Profil</h1>
                <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences.</p>
            </motion.div>

            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Modifier le Profil</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card className="mt-4">
                        <CardContent className="p-6">
                           <ProfileForm user={user} onSubmit={handleProfileSubmit} isLoading={updateProfileMutation.isPending} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                     <Card className="mt-4">
                        <CardHeader><CardTitle>Préférences de Notification</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground py-12">La gestion des notifications sera bientôt disponible.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProfilePage;