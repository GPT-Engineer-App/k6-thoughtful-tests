import { useState, useEffect, useRef } from "react";
import { Cat, Heart, Info, Paw, RefreshCw, Star, Moon, Sun, Camera, Sparkles, Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", popularity: 85, lifespan: "12-15 years" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified", popularity: 78, lifespan: "10-17 years" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Friendly, Intelligent", popularity: 90, lifespan: "9-15 years" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent", popularity: 82, lifespan: "12-20 years" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Intelligent", popularity: 75, lifespan: "8-14 years" },
  { name: "Bengal", origin: "United States", temperament: "Active, Playful, Curious", popularity: 88, lifespan: "12-16 years" },
];

const catImages = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg", name: "Whiskers" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg", name: "Mittens" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg", name: "Luna" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg", name: "Oreo" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Collage_of_Six_Cats-02.jpg/1200px-Collage_of_Six_Cats-02.jpg", name: "Simba" },
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Cats_Petunia_and_Mimosa_2004.jpg/1200px-Cats_Petunia_and_Mimosa_2004.jpg", name: "Nala" },
];

const catSounds = [
  "/meow1.mp3",
  "/meow2.mp3",
  "/purr.mp3",
];

const catPopularityData = [
  { year: 2018, popularity: 65 },
  { year: 2019, popularity: 70 },
  { year: 2020, popularity: 78 },
  { year: 2021, popularity: 82 },
  { year: 2022, popularity: 88 },
  { year: 2023, popularity: 92 },
];

const fetchCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

const CatFact = ({ fact }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md mb-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center">
      <Paw className="mr-2 text-purple-500 flex-shrink-0" />
      <span>{fact}</span>
    </div>
  </motion.div>
);

const CatBreedCard = ({ breed }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" } });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {breed.name}
            <motion.div animate={controls}>
              <Star className={`h-5 w-5 ${breed.popularity >= 85 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            </motion.div>
          </CardTitle>
          <CardDescription>Origin: {breed.origin}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2"><strong>Temperament:</strong> {breed.temperament}</p>
          <p className="mb-2"><strong>Lifespan:</strong> {breed.lifespan}</p>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Popularity:</span>
            <Progress value={breed.popularity} className="w-full" />
            <span className="ml-2 text-sm font-medium">{breed.popularity}%</span>
          </div>
        </CardContent>
      </Card>
      {breed.popularity >= 85 && (
        <motion.div
          className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      )}
    </motion.div>
  );
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const { data: catFact, refetch: refetchCatFact } = useQuery({
    queryKey: ["catFact"],
    queryFn: fetchCatFact,
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const playRandomCatSound = () => {
    if (audioRef.current) {
      audioRef.current.src = catSounds[Math.floor(Math.random() * catSounds.length)];
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0];
    }
  };

  useEffect(() => {
    if (likes > 0 && likes % 5 === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      playRandomCatSound();
    }
  }, [likes]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gradient-to-b from-gray-900 to-purple-900' : 'bg-gradient-to-b from-purple-100 to-pink-100'} p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            className="text-5xl font-bold flex items-center text-purple-700 dark:text-purple-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Cat className="mr-4 text-pink-500" size={48} /> Fantastic Felines
          </motion.h1>
          <div className="flex items-center">
            <Sun className="h-4 w-4 mr-2" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-4 w-4 ml-2" />
          </div>
        </div>
        
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-4"
            >
              <Alert>
                <Camera className="h-4 w-4" />
                <AlertTitle>Milestone reached!</AlertTitle>
                <AlertDescription>
                  You've liked {likes} cat photos. Keep spreading the love!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {catImages.map((cat, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    className="relative p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <img
                      src={cat.url}
                      alt={`Cute cat named ${cat.name}`}
                      className="mx-auto object-cover w-full h-[400px] rounded-xl shadow-2xl"
                    />
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                      {cat.name}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-sm hover:bg-white/75 dark:bg-black/50 dark:hover:bg-black/75"
                            onClick={() => {
                              setLikes(likes + 1);
                              playRandomCatSound();
                            }}
                          >
                            <Heart className={`h-6 w-6 ${likes > 0 ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Show some love!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {likes > 0 && (
                      <Badge variant="secondary" className="absolute bottom-4 left-4">
                        {likes} {likes === 1 ? 'Like' : 'Likes'}
                      </Badge>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Button variant="outline" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              className="w-[200px]"
              value={[volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Music className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cat Sounds</DialogTitle>
                  <DialogDescription>
                    Click on a sound to play it!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {catSounds.map((sound, index) => (
                    <Button key={index} onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.src = sound;
                        audioRef.current.play();
                      }
                    }}>
                      Play Sound {index + 1}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
        <audio ref={audioRef} />

        <Tabs defaultValue="facts" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="stats">Cat Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Fascinating Feline Facts
                  <Button variant="outline" size="icon" onClick={() => refetchCatFact()}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>Discover interesting tidbits about our feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {catFact && <CatFact key={catFact} fact={catFact} />}
                </AnimatePresence>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catBreeds.map((breed) => (
                    <CatBreedCard key={breed.name} breed={breed} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Cat Popularity Over Time</CardTitle>
                <CardDescription>See how cat popularity has increased in recent years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={catPopularityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="popularity" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-purple-50 dark:bg-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 text-purple-500 dark:text-purple-300" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg dark:text-gray-200">
                Cats have a unique way of walking. Unlike most mammals, they directly register, meaning their hind paws fall almost exactly in the same place as their front paws when they walk.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
