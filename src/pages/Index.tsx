import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'men' | 'women';
  size: string[];
  color: string;
  brand: string;
  isOnSale?: boolean;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Классическая рубашка',
    price: 4990,
    originalPrice: 6990,
    image: '/img/30e89bab-0f87-4aba-83d2-17071b7f354b.jpg',
    category: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: 'Белый',
    brand: 'ZARA',
    isOnSale: true,
  },
  {
    id: 2,
    name: 'Джинсы слим',
    price: 7990,
    image: '/placeholder.svg',
    category: 'men',
    size: ['30', '32', '34', '36'],
    color: 'Синий',
    brand: 'Levi\'s',
  },
  {
    id: 3,
    name: 'Летнее платье',
    price: 3990,
    originalPrice: 5990,
    image: '/img/d26c4e10-98ed-473a-b507-03248dc21d6c.jpg',
    category: 'women',
    size: ['XS', 'S', 'M', 'L'],
    color: 'Розовый',
    brand: 'H&M',
    isOnSale: true,
  },
  {
    id: 4,
    name: 'Кроссовки спортивные',
    price: 12990,
    image: '/img/452a1099-42a3-431d-809f-ba02695e18c3.jpg',
    category: 'men',
    size: ['40', '41', '42', '43', '44'],
    color: 'Черный',
    brand: 'Nike',
  },
  {
    id: 5,
    name: 'Блузка шелковая',
    price: 5990,
    image: '/placeholder.svg',
    category: 'women',
    size: ['XS', 'S', 'M'],
    color: 'Бежевый',
    brand: 'Mango',
  },
  {
    id: 6,
    name: 'Куртка джинсовая',
    price: 8990,
    originalPrice: 11990,
    image: '/placeholder.svg',
    category: 'women',
    size: ['S', 'M', 'L'],
    color: 'Синий',
    brand: 'ZARA',
    isOnSale: true,
  },
];

export default function Index() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 15000]);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: undefined,
    image: '/placeholder.svg',
    category: 'men',
    size: [],
    color: '',
    brand: '',
    isOnSale: false,
  });

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (selectedColor !== 'all' && product.color !== selectedColor) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.color && newProduct.brand) {
      const product: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: newProduct.name,
        price: newProduct.price,
        originalPrice: newProduct.originalPrice,
        image: newProduct.image || '/placeholder.svg',
        category: newProduct.category as 'men' | 'women',
        size: newProduct.size || [],
        color: newProduct.color,
        brand: newProduct.brand,
        isOnSale: newProduct.isOnSale || false,
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        price: 0,
        originalPrice: undefined,
        image: '/placeholder.svg',
        category: 'men',
        size: [],
        color: '',
        brand: '',
        isOnSale: false,
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price && newProduct.color && newProduct.brand) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...newProduct } 
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        price: 0,
        originalPrice: undefined,
        image: '/placeholder.svg',
        category: 'men',
        size: [],
        color: '',
        brand: '',
        isOnSale: false,
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3X3' },
    { id: 'men', label: 'Мужское', icon: 'User' },
    { id: 'women', label: 'Женское', icon: 'Users' },
    { id: 'sale', label: 'Распродажа', icon: 'Percent' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
    { id: 'about', label: 'О нас', icon: 'Info' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shirt" size={32} className="text-primary" />
              <h1 className="text-2xl font-montserrat font-bold text-primary">StyleShop</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${
                    currentSection === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground/80'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-opensans font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              <div className="flex items-center space-x-2 ml-4">
                <Switch
                  checked={isAdminMode}
                  onCheckedChange={setIsAdminMode}
                  id="admin-mode"
                />
                <Label htmlFor="admin-mode" className="text-sm font-opensans">
                  Админ
                </Label>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Стиль без границ
            </h2>
            <p className="text-xl md:text-2xl font-opensans text-muted-foreground mb-8 leading-relaxed">
              Откройте для себя коллекцию модной одежды, которая подчеркнет вашу индивидуальность
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 font-opensans font-semibold">
                <Icon name="ShoppingBag" className="mr-2" size={20} />
                Каталог товаров
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-opensans font-semibold">
                <Icon name="Percent" className="mr-2" size={20} />
                Распродажа
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel */}
      {isAdminMode && (
        <section className="py-8 bg-coral/10 border-b-2 border-coral/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-montserrat font-semibold text-coral">
                <Icon name="Settings" className="inline mr-2" size={24} />
                Управление товарами
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-coral hover:bg-coral/90" onClick={() => setIsAddingProduct(true)}>
                    <Icon name="Plus" className="mr-2" size={18} />
                    Добавить товар
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Добавить новый товар</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Название товара</Label>
                      <Input
                        id="name"
                        value={newProduct.name || ''}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="Введите название"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Цена (₽)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price || ''}
                          onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Старая цена (₽)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={newProduct.originalPrice || ''}
                          onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                          placeholder="Необязательно"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="brand">Бренд</Label>
                      <Input
                        id="brand"
                        value={newProduct.brand || ''}
                        onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                        placeholder="Введите бренд"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="color">Цвет</Label>
                        <Input
                          id="color"
                          value={newProduct.color || ''}
                          onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                          placeholder="Введите цвет"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Категория</Label>
                        <Select 
                          value={newProduct.category} 
                          onValueChange={(value) => setNewProduct({...newProduct, category: value as 'men' | 'women'})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="men">Мужское</SelectItem>
                            <SelectItem value="women">Женское</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sizes">Размеры (через запятую)</Label>
                      <Input
                        id="sizes"
                        value={newProduct.size?.join(', ') || ''}
                        onChange={(e) => setNewProduct({...newProduct, size: e.target.value.split(',').map(s => s.trim())})}
                        placeholder="S, M, L, XL"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        value={newProduct.image || ''}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        placeholder="/placeholder.svg"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newProduct.isOnSale || false}
                        onCheckedChange={(checked) => setNewProduct({...newProduct, isOnSale: checked})}
                        id="isOnSale"
                      />
                      <Label htmlFor="isOnSale">Товар на распродаже</Label>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddProduct} className="flex-1">
                        Добавить товар
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingProduct(false)}
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <h3 className="text-2xl font-montserrat font-semibold">Каталог товаров</h3>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="men">Мужское</SelectItem>
                  <SelectItem value="women">Женское</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Бренд" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все бренды</SelectItem>
                  <SelectItem value="ZARA">ZARA</SelectItem>
                  <SelectItem value="H&M">H&M</SelectItem>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Levi's">Levi's</SelectItem>
                  <SelectItem value="Mango">Mango</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Цвет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цвета</SelectItem>
                  <SelectItem value="Белый">Белый</SelectItem>
                  <SelectItem value="Черный">Черный</SelectItem>
                  <SelectItem value="Синий">Синий</SelectItem>
                  <SelectItem value="Розовый">Розовый</SelectItem>
                  <SelectItem value="Бежевый">Бежевый</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-4 min-w-64">
                <span className="text-sm font-opensans font-medium whitespace-nowrap">Цена:</span>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  min={0}
                  step={500}
                  className="flex-1"
                />
                <span className="text-sm font-opensans text-muted-foreground whitespace-nowrap">
                  {priceRange[0]} - {priceRange[1]} ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isOnSale && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      SALE
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isAdminMode ? (
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="rounded-full shadow-md"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Icon name="Edit" size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Редактировать товар</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-name">Название товара</Label>
                                <Input
                                  id="edit-name"
                                  value={newProduct.name || ''}
                                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-price">Цена (₽)</Label>
                                  <Input
                                    id="edit-price"
                                    type="number"
                                    value={newProduct.price || ''}
                                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-originalPrice">Старая цена (₽)</Label>
                                  <Input
                                    id="edit-originalPrice"
                                    type="number"
                                    value={newProduct.originalPrice || ''}
                                    onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-brand">Бренд</Label>
                                <Input
                                  id="edit-brand"
                                  value={newProduct.brand || ''}
                                  onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-color">Цвет</Label>
                                  <Input
                                    id="edit-color"
                                    value={newProduct.color || ''}
                                    onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-category">Категория</Label>
                                  <Select 
                                    value={newProduct.category} 
                                    onValueChange={(value) => setNewProduct({...newProduct, category: value as 'men' | 'women'})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="men">Мужское</SelectItem>
                                      <SelectItem value="women">Женское</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-sizes">Размеры (через запятую)</Label>
                                <Input
                                  id="edit-sizes"
                                  value={newProduct.size?.join(', ') || ''}
                                  onChange={(e) => setNewProduct({...newProduct, size: e.target.value.split(',').map(s => s.trim())})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-image">URL изображения</Label>
                                <Input
                                  id="edit-image"
                                  value={newProduct.image || ''}
                                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={newProduct.isOnSale || false}
                                  onCheckedChange={(checked) => setNewProduct({...newProduct, isOnSale: checked})}
                                  id="edit-isOnSale"
                                />
                                <Label htmlFor="edit-isOnSale">Товар на распродаже</Label>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button onClick={handleUpdateProduct} className="flex-1">
                                  Сохранить
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setEditingProduct(null)}
                                  className="flex-1"
                                >
                                  Отмена
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="rounded-full shadow-md"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Icon name="Trash" size={16} />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                        <Icon name="Heart" size={16} />
                      </Button>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.brand}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.color}
                      </span>
                    </div>
                    
                    <h4 className="font-montserrat font-semibold text-lg leading-tight">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center space-x-2">
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </span>
                      )}
                      <span className="text-xl font-montserrat font-bold text-primary">
                        {product.price.toLocaleString()} ₽
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 pt-2">
                      {product.size.slice(0, 4).map((size) => (
                        <Badge key={size} variant="secondary" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 font-opensans font-semibold">
                      <Icon name="ShoppingCart" className="mr-2" size={16} />
                      Добавить в корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-montserrat font-semibold mb-2">
                Товары не найдены
              </h3>
              <p className="text-muted-foreground font-opensans">
                Попробуйте изменить параметры фильтрации
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Shirt" size={28} className="text-primary" />
                <h3 className="text-xl font-montserrat font-bold">StyleShop</h3>
              </div>
              <p className="text-secondary-foreground/80 font-opensans">
                Ваш надежный партнер в мире моды и стиля.
              </p>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 font-opensans">
                <li><a href="#" className="hover:text-primary transition-colors">Мужская одежда</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Женская одежда</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Распродажа</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новинки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 font-opensans">
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Размеры</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 font-opensans">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@styleshop.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Моды, 1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-secondary-foreground/80 font-opensans">
              © 2024 StyleShop. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}