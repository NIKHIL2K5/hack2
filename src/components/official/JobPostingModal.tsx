
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobPostingForm } from "@/hooks/useJobPostingForm";
import { JobBasicFields } from "./JobBasicFields";
import { ArrayFieldInput } from "./ArrayFieldInput";

interface JobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string;
}

export const JobPostingModal = ({ isOpen, onClose, organizationName }: JobPostingModalProps) => {
  const {
    formData,
    handleInputChange,
    handleArrayField,
    addArrayItem,
    removeArrayItem,
    handleSubmit
  } = useJobPostingForm(organizationName, onClose);

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
            <CardTitle className="text-2xl font-bold text-white">Post New Job</CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <JobBasicFields 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArrayFieldInput
                  label="Responsibilities"
                  values={formData.responsibilities}
                  placeholder="Enter a responsibility"
                  onChange={(index, value) => handleArrayField('responsibilities', index, value)}
                  onAdd={() => addArrayItem('responsibilities')}
                  onRemove={(index) => removeArrayItem('responsibilities', index)}
                />

                <ArrayFieldInput
                  label="Requirements"
                  values={formData.requirements}
                  placeholder="Enter a requirement"
                  onChange={(index, value) => handleArrayField('requirements', index, value)}
                  onAdd={() => addArrayItem('requirements')}
                  onRemove={(index) => removeArrayItem('requirements', index)}
                />

                <ArrayFieldInput
                  label="Required Skills"
                  values={formData.skills}
                  placeholder="Enter a skill"
                  onChange={(index, value) => handleArrayField('skills', index, value)}
                  onAdd={() => addArrayItem('skills')}
                  onRemove={(index) => removeArrayItem('skills', index)}
                />

                <ArrayFieldInput
                  label="Benefits"
                  values={formData.benefits}
                  placeholder="Enter a benefit"
                  onChange={(index, value) => handleArrayField('benefits', index, value)}
                  onAdd={() => addArrayItem('benefits')}
                  onRemove={(index) => removeArrayItem('benefits', index)}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
