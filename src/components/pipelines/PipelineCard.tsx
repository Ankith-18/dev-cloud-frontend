import { Button } from '@/components/ui/Button'
import { 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import type { Pipeline } from '@/types'

interface PipelineCardProps {
  pipeline: Pipeline
  onRun: () => void
  onViewDetails: () => void
}

export function PipelineCard({ pipeline, onRun, onViewDetails }: PipelineCardProps) {
  const getStatusIcon = () => {
    switch (pipeline.status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'running':
        return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (pipeline.status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
              {pipeline.name}
            </h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
              {pipeline.status}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Project: {pipeline.projectName}</span>
            <span>Trigger: {pipeline.trigger}</span>
            {pipeline.branch && <span>Branch: {pipeline.branch}</span>}
            {pipeline.duration && <span>Duration: {pipeline.duration}s</span>}
          </div>

          {/* Pipeline Steps Preview */}
          <div className="mt-3 flex items-center gap-2">
            {pipeline.steps.map((step, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="text-gray-300 mx-1">→</span>}
                <div className="flex items-center gap-1">
                  {step.status === 'success' && <CheckCircleIcon className="h-3 w-3 text-green-500" />}
                  {step.status === 'failed' && <XCircleIcon className="h-3 w-3 text-red-500" />}
                  {step.status === 'running' && <ArrowPathIcon className="h-3 w-3 text-blue-500 animate-spin" />}
                  {step.status === 'pending' && <ClockIcon className="h-3 w-3 text-gray-400" />}
                  <span className="text-xs text-gray-600 dark:text-gray-400">{step.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          <Button 
            size="sm"
            onClick={onRun}
            disabled={pipeline.status === 'running'}
          >
            <PlayIcon className="h-4 w-4 mr-1" />
            Run
          </Button>
        </div>
      </div>
    </div>
  )
}