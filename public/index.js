import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";

const categories = ['tops', 'bottoms', 'shoes', 'hats'];

export default function ClothingCombiner() {
  const [collection, setCollection] = useState({ tops: [], bottoms: [], shoes: [], hats: [] });
  const [selected, setSelected] = useState({ tops: null, bottoms: null, shoes: null, hats: null });
  const [images, setImages] = useState({});

  const handleAddImage = (category, file) => {
    const url = URL.createObjectURL(file);
    setCollection(prev => ({
      ...prev,
      [category]: [...prev[category], url],
    }));
  };

  const handleSelect = (category, url) => {
    setSelected(prev => ({
      ...prev,
      [category]: url,
    }));
  };

  const handleRemove = (category, url) => {
    setCollection(prev => ({
      ...prev,
      [category]: prev[category].filter(img => img !== url),
    }));
    setSelected(prev => ({
      ...prev,
      [category]: prev[category] === url ? null : prev[category],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clothing Combiner</h1>
      <Tabs defaultValue="tops">
        <TabsList className="grid grid-cols-4 w-full">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="space-y-4">
            <div className="flex items-center gap-2">
              <Input type="file" accept="image/*" onChange={e => handleAddImage(cat, e.target.files[0])} />
              <Button variant="outline" onClick={() => setSelected(prev => ({ ...prev, [cat]: null }))}>Clear Selection</Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {collection[cat].map((url, idx) => (
                <Card
                  key={idx}
                  className={`cursor-pointer border-2 ${selected[cat] === url ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => handleSelect(cat, url)}
                >
                  <CardContent className="p-2 relative">
                    <img src={url} alt={cat} className="w-full h-32 object-cover rounded" />
                    <Button
                      size="icon"
                      className="absolute top-1 right-1"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(cat, url);
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div>
        <h2 className="text-xl font-semibold">Your Outfit</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {categories.map(cat => (
            <div key={cat} className="text-center">
              <p className="capitalize font-medium mb-1">{cat}</p>
              {selected[cat] ? (
                <img src={selected[cat]} alt={cat} className="w-full h-32 object-cover rounded border" />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">No {cat}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
