import { useState } from "react";
import { Cat, Heart, Info, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Friendly, Intelligent" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent" },
];

const CatFact = ({ fact }) => (
  <motion.li
    className="bg-white p-4 rounded-lg shadow-md mb-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center">
      <Paw className="mr-2 text-purple-500" />
      <span>{fact}</span>
    </div>
  </motion.li>
);

const CatBreedCard = ({ breed }) => (
  <Card>
    <CardHeader>
      <CardTitle>{breed.name}</CardTitle>
      <CardDescription>Origin: {breed.origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {breed.temperament}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-8 flex items-center justify-center text-purple-700"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Cat className="mr-4 text-pink-500" size={48} /> Fantastic Felines
        </motion.h1>
        
        <div className="relative mb-12">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A cute cat"
            className="mx-auto object-cover w-full h-[500px] rounded-xl shadow-2xl"
          />
          <Button 
            variant="outline" 
            size="icon"
            className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-sm hover:bg-white/75"
            onClick={() => setLikes(likes + 1)}
          >
            <Heart className={`h-6 w-6 ${likes > 0 ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
          </Button>
          {likes > 0 && (
            <Badge variant="secondary" className="absolute bottom-4 left-4">
              {likes} {likes === 1 ? 'Like' : 'Likes'}
            </Badge>
          )}
        </div>

        <Tabs defaultValue="facts" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle>Fascinating Feline Facts</CardTitle>
                <CardDescription>Discover interesting tidbits about our feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <CatFact fact="Cats have been domesticated for over 4,000 years." />
                  <CatFact fact="They can make over 100 different vocal sounds." />
                  <CatFact fact="A group of cats is called a 'clowder'." />
                  <CatFact fact="Cats spend 70% of their lives sleeping." />
                  <CatFact fact="They have an excellent sense of balance and flexible bodies." />
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Learn about some of the most beloved cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed) => (
                    <CatBreedCard key={breed.name} breed={breed} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 text-purple-500" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Cats have a unique way of walking. Unlike most mammals, they directly register, meaning their hind paws fall almost exactly in the same place as their front paws when they walk.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
