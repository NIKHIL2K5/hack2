
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  tags: string[];
  districts: string[];
  startDate: string;
  endDate: string;
  budget: string;
  status: 'active' | 'inactive' | 'expired';
}

interface SchemeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scheme: Omit<Scheme, 'id' | 'applicationsReceived' | 'applicationsApproved'>) => void;
  scheme: Scheme | null;
  districts: string[];
}

export const SchemeFormModal = ({ isOpen, onClose, onSave, scheme, districts }: SchemeFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eligibility: '',
    tags: [''],
    districts: [] as string[],
    startDate: '',
    endDate: '',
    budget: '',
    status: 'active' as 'active' | 'inactive' | 'expired'
  });

  useEffect(() => {
    if (scheme) {
      setFormData({
        name: scheme.name,
        description: scheme.description,
        eligibility: scheme.eligibility,
        tags: scheme.tags.length > 0 ? scheme.tags : [''],
        districts: scheme.districts,
        startDate: scheme.startDate,
        endDate: scheme.endDate,
        budget: scheme.budget,
        status: scheme.status
      });
    } else {
      setFormData({
        name: '',
        description: '',
        eligibility: '',
        tags: [''],
        districts: [],
        startDate: '',
        endDate: '',
        budget: '',
        status: 'active'
      });
    }
  }, [scheme, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = formData.tags.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  const handleDistrictChange = (district: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, districts: [...prev.districts, district] }));
    } else {
      setFormData(prev => ({ ...prev, districts: prev.districts.filter(d => d !== district) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredTags = formData.tags.filter(tag => tag.trim() !== '');
    
    onSave({
      name: formData.name,
      description: formData.description,
      eligibility: formData.eligibility,
      tags: filteredTags,
      districts: formData.districts,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: formData.budget,
      status: formData.status
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 rounded-xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-transparent border-none">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/20">
            <CardTitle className="text-2xl font-bold text-white">
              {scheme ? 'Edit Scheme' : 'Create New Scheme'}
            </CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-white">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Scheme Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter scheme name"
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-white">Budget *</Label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="e.g., ₹10 Crore"
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the scheme objectives and benefits"
                  className="bg-white/10 border-white/20 text-white min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label className="text-white">Eligibility Criteria *</Label>
                <Textarea
                  value={formData.eligibility}
                  onChange={(e) => handleInputChange('eligibility', e.target.value)}
                  placeholder="Define who can apply for this scheme"
                  className="bg-white/10 border-white/20 text-white min-h-[80px]"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <Label className="text-white">Tags</Label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                        placeholder="Enter tag"
                        className="bg-white/10 border-white/20 text-white"
                      />
                      {formData.tags.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeTag(index)}
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 border-red-500/50 text-red-200"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white">Start Date *</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-white">End Date *</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <Label className="text-white">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'expired') => handleInputChange('status', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Districts */}
              <div>
                <Label className="text-white">Applicable Districts</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 max-h-60 overflow-y-auto bg-white/5 p-4 rounded-lg">
                  {districts.map((district) => (
                    <div key={district} className="flex items-center space-x-2">
                      <Checkbox
                        id={district}
                        checked={formData.districts.includes(district)}
                        onCheckedChange={(checked) => handleDistrictChange(district, checked as boolean)}
                        className="border-white/20"
                      />
                      <label htmlFor={district} className="text-white/80 text-sm cursor-pointer">
                        {district}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm mt-2">
                  Selected: {formData.districts.length} districts
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                >
                  {scheme ? 'Update Scheme' : 'Create Scheme'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
